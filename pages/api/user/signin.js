import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import dbConnect from '../../../utils/dbConnect'

import sessionSchema from '../../../database schemas/sessionSchema'
import userSchema from "../../../database schemas/userSchema"

dbConnect();

export default async (req, res) => {
    const { method } = req

    switch (method) {

        case 'POST':
            try {

                const { usernameOrEmail, password } = req.body
                if (!usernameOrEmail) return res.json({ success: false, reason: "Username or Password not provided." })

                const existingUsername = await userSchema.findOne({ username: usernameOrEmail });
                const existingEmail = await userSchema.findOne({ email: usernameOrEmail });

                if (!existingUsername && !existingEmail) return res.json({ success: false, reason: "Incorrect username/email or password." })

                let existingData
                if (existingEmail) existingData = existingEmail
                if (existingUsername) existingData = existingUsername

                if (!existingData.active) {
                    if (!existingData.verified) return res.json({ success: false, reason: "Account is not verified. Please contact admin." })
                    return res.json({ success: false, reason: "Account is inactive. Please contact admin." })
                }

                const passwordData = existingData.password

                const correctPassword = await bcrypt.compare(password, passwordData)
                if (!correctPassword) return res.json({ success: false, reason: "Incorrect username/email or password." })

                let ip = req.headers['x-forwarded-for'];
                if (!ip) return res.json({ success: false, reason: "Internal Server Error." })
                if (ip.substr(0, 7) == "::ffff:") {
                    ip = ip.substr(7)
                }

                const activeSessions = await sessionSchema.find({ userId: existingData._id, active: true })
                if (activeSessions.length > 0) {
                    activeSessions.forEach(async (session) => {
                        const { _id } = session
                        await sessionSchema.findByIdAndUpdate(_id, {
                            active: false
                        })
                    })
                }

                const session = await sessionSchema.create({
                    userId: existingData._id,
                    deviceIP: ip,
                    active: true
                })

                await userSchema.findByIdAndUpdate(existingData._id, {
                    $addToSet: {
                        sessions: session._id
                    }
                })

                const tokenPayload = {
                    sessionId: session._id
                }

                const token = await jwt.sign(tokenPayload, process.env.JWT_SECRET)

                res.json({ success: true, token })

            } catch (error) {
                res.status(503).json("Internal Server Error.")
            }
            break;

        default:
            res.json(false)
            break;

    }

}