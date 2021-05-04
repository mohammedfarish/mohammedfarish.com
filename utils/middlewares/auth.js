import jwt from 'jsonwebtoken'

import sessionSchema from "../../database schemas/sessionSchema";
import userSchema from '../../database schemas/userSchema';

const auth = async (req) => {

    try {

        const token = req.headers['x-auth-token'];
        if (!token) return false

        const verify = await jwt.verify(token, process.env.JWT_SECRET)
        if (!verify) return false

        const activeSession = await sessionSchema.findOne({ _id: verify.sessionId, active: true })
        if (!activeSession) return false

        const user = await userSchema.findOne({ _id: activeSession.userId, active: true, verified: true })
        if (!user) return false

        req.user.id = activeSession.userId
        req.user.role = user.role
        return true

    } catch (error) {
        return false
    }
}

export default auth;