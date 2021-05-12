import jwt from 'jsonwebtoken'

import host from './host';

import sessionSchema from "../database/schema/sessionSchema";
import userSchema from '../database/schema/userSchema';
import getIP from './getIP';
import isDev from './isDev';

export default async function auth(req) {

    try {

        const development = await isDev()
        if (development) {
            req.dev = true
            return true
        }

        const validHost = await host(req)
        if (!validHost) return false

        const token = req.headers['x-auth-token'];
        if (!token) return false

        const verify = await jwt.verify(token, process.env.JWT_SECRET)
        if (!verify) return false

        const activeSession = await sessionSchema.findOne({ _id: verify.sessionId, active: true })
        if (!activeSession) return false

        const user = await userSchema.findOne({ _id: activeSession.userId, active: true, verified: true })
        if (!user) return false

        const ip = await getIP(req)
        if (!ip) return false

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