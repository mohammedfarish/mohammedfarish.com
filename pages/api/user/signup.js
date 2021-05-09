import bcrypt from 'bcryptjs'

import dbConnect from '../../../utils/database/dbConnect'
import userSchema from '../../../utils/database/schema/userSchema';

dbConnect();

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'POST':
            try {

                let { username, email, repeatEmail, password, displayName } = req.body
                if (!username || !email || !repeatEmail || !password || !displayName) return res.json({ success: false, reason: 'Incomplete fields.' });

                username = username.toLowerCase()
                email = email.toLowerCase()

                if (email !== repeatEmail) return res.json({ success: false, reason: `Emails don't match.` });

                if (password.length < 8) return res.json({ success: false, reason: `Password is short. Requires a minimum of 8 characters.` });

                const existingUsername = await userSchema.findOne({ username })
                if (existingUsername) return res.json({ success: false, reason: 'Username already in use.' });

                const existingEmail = await userSchema.findOne({ email })
                if (existingEmail) return res.json({ success: false, reason: 'Email already in use.' });

                const salt = await bcrypt.genSalt();
                password = await bcrypt.hash(password, salt);

                await userSchema.create({
                    username,
                    email,
                    password,
                    verified: false,
                    active: false,
                    role: 'subscriber'
                })

                res.json({ success: true })

            } catch (error) {
                res.status(503).json("Internal Server Error.")
            }
            break;

        default:
            res.status(404).json(false)
            break
    }

}
