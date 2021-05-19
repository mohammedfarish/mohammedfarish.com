import Moment from 'moment-timezone';

import auth from '../../../utils/middlewares/auth';

import dbConnect from '../../../utils/database/dbConnect';
import blogSchema from '../../../utils/database/schema/blogSchema';
import rateLimiter from '../../../utils/middlewares/rateLimiter';


dbConnect();

export default async (req, res) => {
    const { method } = req

    const inRateLimit = await rateLimiter(req)
    if (!inRateLimit) return res.status(429).json(false)

    switch (method) {

        case 'POST':
            let { title, slug, content, listed, publish } = req.body
            if (!title || !content) return res.json(false)
            try {
                const authenticate = await auth(req)
                if (!authenticate) return res.status(400).json('Unauthorised')

                if (!slug)
                    slug = title.toLowerCase().split(' ').join('-')

                const author = {
                    id: req.user.id,
                    ip: req.user.ip
                }

                await blogSchema.create({
                    title,
                    slug,
                    date: Moment().tz('Asia/Dubai').format(),
                    content,
                    author,
                    publish,
                    listed
                })

                res.json(true)
            } catch (error) {
                res.status(503).json(false)
            }
            break;

        case 'GET':
            const { q } = req.query
            try {
                const blog = await blogSchema.findOne({ slug: q })
                if (!blog) return res.json(false)

                const moment = Moment(blog.date).tz('Asia/Dubai').format('dddd • MMMM DD YYYY')


                const token = req.headers['x-auth-token'];
                const authenticate = await auth(req)
                if (token) await authenticate

                let data
                if (!authenticate) {
                    const { title, content, publish } = blog

                    data = {
                        title,
                        content,
                        date: moment
                    }

                    if (!publish) data = false

                } else {
                    const { title, content } = blog

                    data = {
                        title,
                        content,
                        date: moment
                    }

                }

                res.json(data)
            } catch (error) {
                res.status(404).json(false)
            }
            break;

        default:
            res.status(404).json(false)
            break;

    }
}