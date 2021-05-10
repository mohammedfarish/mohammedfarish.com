import { Chance } from "chance"
import Moment from "moment-timezone"

import dbConnect from "../../../utils/database/dbConnect"

import blogSchema from "../../../utils/database/schema/blogSchema"

dbConnect()

export default async (req, res) => {
    const { method } = req

    switch (method) {

        case 'GET':

            try {
                const posts = await blogSchema.find()

                const data = []
                await posts.reverse().forEach(post => {
                    let { title, slug, date } = post
                    if (req.query.type === 'latest')
                        if (data.length >= 4) return;

                    const moment = Moment(date).tz('Asia/Dubai')
                    const momentNow = Moment().tz('Asia/Dubai')

                    if (moment.year() === momentNow.year()) {
                        date = moment.format('MMM DD')
                    } else {
                        date = moment.format('MMM DD YYYY')
                    }

                    const key = new Chance().guid({ version: 2 })

                    const formatted = { title, slug, date, key }

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