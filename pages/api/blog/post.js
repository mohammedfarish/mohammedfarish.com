import Moment from 'moment-timezone';

import auth from '../../../utils/middlewares/auth';

import dbConnect from '../../../utils/database/dbConnect';
import blogSchema from '../../../utils/database/schema/blogSchema';


dbConnect();

export default async (req, res) => {
    const { method } = req

    switch (method) {

        case 'POST':
            let { title, slug, date, content } = req.body
            if (!title || !content) return res.json(false)

            const authenticate = await auth(req)
            if (!authenticate) return res.status(400).json('Unauthorised')

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
                author
            })

            res.json(true)
            break;

        case 'GET':
            const { q } = req.query
            const blog = await blogSchema.findOne({ slug: q })
            if (!blog) return res.json(false)

            const data = {
                title: blog.title,
                content: blog.content,
                date: blog.date
            }

            res.json(data)
            break;

        default:
            res.status(404).json(false)
            break;

    }
}