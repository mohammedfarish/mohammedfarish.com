import Moment from 'moment-timezone'

import dbConnect from '../../utils/database/dbConnect'
import deviceAuth from '../../utils/middlewares/deviceAuth'

import deviceLocationHistory from '../../utils/database/schema/deviceLocationHistory';

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

                const data = {
                    location: locationInfo,
                    lastUpdate: Moment(time).tz('Asia/Dubai').fromNow()
                }

                res.json(data)

            } catch (error) {
                res.status(503).json("Internal Server Error.")
            }
            break;

        default:
            res.status(404).json(false)
            break;
    }

}