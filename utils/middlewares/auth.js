import jwt from 'jsonwebtoken'

import sessionSchema from "../database/schema/sessionSchema";
import userSchema from '../database/schema/userSchema';

export default async function auth(req) {

    try {

        const token = req.headers['x-auth-token'];
        if (!token) return false

        const verify = await jwt.verify(token, process.env.JWT_SECRET)
        if (!verify) return false

        const activeSession = await sessionSchema.findOne({ _id: verify.sessionId, active: true })
        if (!activeSession) return false

        const user = await userSchema.findOne({ _id: activeSession.userId, active: true, verified: true })
        if (!user) return false

        let ip = req.headers['x-forwarded-for'];
        if (!ip) return false
        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7)
        }

        req.user = {
            id: activeSession.userId,
            role: user.role,
            ip
        }

        return true

    } catch (error) {

        return false

    }
}

