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
                posts.reverse().forEach(post => {
                    let { title, slug, date } = post
                    if (req.query.type === 'latest')
                        if (data.length >= 4) return;

                    const moment = Moment(date).tz('Asia/Dubai')
                    const momentNow = Moment(date).tz('Asia/Dubai')

                    let month = moment.month() + 1,
                        year = moment.year()

                    date = moment.date()


                    if (month === 1) month = "Jan"
                    if (month === 2) month = "Feb"
                    if (month === 3) month = "Mar"
                    if (month === 4) month = "Apr"
                    if (month === 5) month = "May"
                    if (month === 6) month = "Jun"
                    if (month === 7) month = "Jul"
                    if (month === 8) month = "Aug"
                    if (month === 9) month = "Sep"
                    if (month === 10) month = "Oct"
                    if (month === 11) month = "Nov"
                    if (month === 12) month = "Dev"

                    if (date.toString().length === 1) date = "0" + date
                    if (year === momentNow.year()) {
                        date = `${month} ${date}`
                    } else {
                        date = `${month} ${date} ${year}`
                    }

                    const key = new Chance().guid({ version: 2 })

                    const formatted = { title, slug, date, key }

                    data.push(formatted);
                })
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