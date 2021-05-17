import Chance from 'chance'
import Moment from 'moment-timezone'

import analyticsSchema from '../../utils/database/schema/analyticsSchema'
import getIP from '../../utils/middlewares/getIP'

export default async (req, res) => {
    const { method } = req

    const chance = new Chance()
    const moment = Moment().tz('Asia/Dubai')

    switch (method) {

        case 'POST':
            const { uid } = req.body
            try {

                let guid = null,
                    response = true

                if (uid === null) {
                    const { userAgent, data: activityData } = req.body
                    guid = chance.guid({ version: 5 })
                    response = { uid: guid }
                    const data = {
                        _id: guid,
                        userAgent,
                        activityData: {
                            ...activityData,
                            ip: await getIP(),
                            time: moment.format(),
                        }
                    }

                    await analyticsSchema.create({
                        ...data,
                        initialActivity: moment.format(),
                        lastActivity: moment.format(),
                        visitCount: 1
                    })
                    return res.json(response)
                }

                let { data: activityData } = req.body

                if (activityData.type === 'visit') {

                    activityData = {
                        ...activityData,
                        ip: await getIP(),
                        time: moment.format(),
                    }

                    await analyticsSchema.findByIdAndUpdate(uid, {
                        lastActivity: moment.format(),
                        $addToSet: {
                            activityData
                        },
                        $inc: {
                            visitCount: 1
                        }
                    })
                }

                if (activityData.type === 'browse') {

                    activityData = {
                        ...activityData,
                        ip: await getIP(),
                        time: moment.format(),
                    }

                    await analyticsSchema.findByIdAndUpdate(uid, {
                        lastActivity: moment.format(),
                        $addToSet: {
                            activityData
                        },
                        $inc: {
                            visitCount: 0
                        }
                    })
                }

                res.json(response)
            } catch (error) {
                res.json(false)
            }
            break;

        default:
            res.status(404).json(false)
            break;

    }

}