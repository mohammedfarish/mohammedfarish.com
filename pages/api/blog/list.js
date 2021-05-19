import { Chance } from "chance"
import Moment from "moment-timezone"

import dbConnect from "../../../utils/database/dbConnect"

import blogSchema from "../../../utils/database/schema/blogSchema"
import auth from "../../../utils/middlewares/auth"

dbConnect()

export default async (req, res) => {
    const { method } = req

    switch (method) {

        case 'GET':

            try {
                const posts = await blogSchema.find()

                const token = req.headers['x-auth-token'];
                const authenticate = await auth(req)
                if (token) await authenticate

                const data = []
                await posts.reverse().forEach(post => {
                    let { title, slug, date, publish, listed } = post
                    if (req.query.type === 'latest')
                        if (data.length >= 4) return;

                    let status = []

                    if (!authenticate) {

                        if (publish === false) return;
                        if (listed === false) return;

                    } else {

                        if (publish === false) status.push('UNPUBLISHED')
                        if (listed === false) status.push('UNLISTED')

                        if (publish && listed) status.push('PUBLISHED')

                        if (status.length === 2) {
                            status = status.join(' & ')
                        } else {
                            status = status[0]
                        }

                    }

                    const moment = Moment(date).tz('Asia/Dubai')
                    const momentNow = Moment().tz('Asia/Dubai')

                    if (moment.year() === momentNow.year()) {
                        date = moment.format('MMM DD')
                    } else {
                        date = moment.format('MMM DD YYYY')
                    }

                    const key = new Chance().guid({ version: 2 })

                    const formatted = { title, slug, date, key, status }

                    data.push(formatted);
                });

                res.json(data)
            } catch (error) {
                res.status(503).json(false)
            }

            break;

        default:
            res.status(404).json(false)
            break;

    }
}