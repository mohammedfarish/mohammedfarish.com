import Moment from 'moment-timezone'

import dbConnect from '../../utils/dbConnect'
import deviceAuth from '../../utils/middlewares/deviceAuth'

import deviceLocationHistory from '../../database schemas/deviceLocationHistory';

dbConnect();

export default async (req, res) => {
    const { method } = req

    switch (method) {

        case 'POST':
            try {
                const authenticate = await deviceAuth(req)
                if (!authenticate) return res.status(400).json(false)

                const { location, latlon, wifi, batteryLevel, device } = req.body
                if (!location || !latlon || !wifi, !batteryLevel || !device) return res.status(400).json(false)

                await deviceLocationHistory.create({
                    location,
                    latlon,
                    wifi,
                    batteryLevel,
                    device,
                    time: Moment().tz('Asia/Dubai').format()
                })

                res.json(true)
            } catch (error) {
                res.json(false)
            }
            break;

        case 'GET':
            try {
                const locationData = await deviceLocationHistory.find()
                    .sort({
                        time: -1
                    })
                    .limit(1)
                const { location: locationInfo, time } = locationData[0]

                const getMinutesDiffBetweenDates = (dateInitial, dateFinal) =>
                    (dateFinal - dateInitial) / (1000 * 60);

                const today = Moment().tz('Asia/Dubai')
                const givenDate = Moment(time).tz('Asia/Dubai')


                let timeDiff = getMinutesDiffBetweenDates(
                    new Date(givenDate.format()),
                    new Date(today.format())
                );

                timeDiff = Math.floor(timeDiff)

                if (timeDiff >= 60) {
                    timeDiff = Math.floor(timeDiff / 60)
                    if (timeDiff < 0) timeDiff = timeDiff * -1
                    if (timeDiff === 1) {
                        timeDiff = timeDiff + " hour ago"
                    } else if (timeDiff <= 24) {
                        timeDiff = timeDiff + " hours ago"
                    } else {
                        timeDiff = Math.floor(timeDiff / 24)
                        if (timeDiff < 0) timeDiff = timeDiff * -1
                        if (timeDiff === 1) {
                            timeDiff = timeDiff + " day ago"
                        } else if (timeDiff <= 30) {
                            timeDiff = timeDiff + " days ago"
                        } else {
                            timeDiff = Math.floor(timeDiff / 30)
                            if (timeDiff < 0) timeDiff = timeDiff * -1
                            if (timeDiff === 1) {
                                timeDiff = timeDiff + " month ago"
                            } else {
                                timeDiff = timeDiff + " months ago"
                            }
                        }
                    }
                } else {
                    if (timeDiff === 0) {
                        timeDiff = "just now"
                    } else {
                        if (timeDiff === 1) {
                            timeDiff = timeDiff + " minute ago"
                        } else {
                            if (timeDiff < 0) timeDiff = timeDiff * -1
                            timeDiff = timeDiff + " minutes ago"
                        }
                    }

                }

                const data = {
                    location: locationInfo,
                    lastUpdate: timeDiff,
                }

                res.json(data)

            } catch (error) {
                res.json(false)
            }
            break;

        default:
            res.json(false)
            break;
    }


}