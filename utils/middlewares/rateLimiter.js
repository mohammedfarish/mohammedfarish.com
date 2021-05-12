import Moment from 'moment-timezone'

import getIP from "./getIP";

import rateLimitSchema from "../database/schema/rateLimitSchema";
import isDev from './isDev';

export default async function rateLimiter(req) {

    const ip = await getIP(req)
    if (!ip) return false

    const development = await isDev()
    if (development) return true

    const existingUser = await rateLimitSchema.findOne({ ip })
    if (existingUser) {
        const { _id, lastReqAt, reqCount } = existingUser
        const maxReq = 30
        const momentNow = Moment().tz('Asia/Dubai').unix()
        const reqMoment = Moment(lastReqAt).tz('Asia/Dubai').unix()

        const timeDiff = momentNow - reqMoment

        if (timeDiff <= 60) {
            if (reqCount >= maxReq) return false
            await rateLimitSchema.findByIdAndUpdate(_id, {
                $inc: {
                    reqCount: 1
                },
                lastReqAt: Moment().tz('Asia/Dubai').format()
            })
        } else {
            await rateLimitSchema.findByIdAndUpdate(_id, {
                reqCount: 1,
                lastReqAt: Moment().tz('Asia/Dubai').format()
            })
        }
    } else {
        await rateLimitSchema.create({
            ip,
            reqCount: 1,
            initialReqAt: Moment().tz('Asia/Dubai').format(),
            lastReqAt: Moment().tz('Asia/Dubai').format()
        })
    }

    return true
}