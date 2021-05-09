import Chance from 'chance'
import builder from 'xmlbuilder';

import dbConnect from '../../utils/database/dbConnect';
import PagesSchema from '../../utils/database/schema/pagesSchema';

import auth from '../../utils/middlewares/auth';

dbConnect();

export default async (req, res) => {
    const { method } = req

    switch (method) {

        case 'GET':
            const chanceObj = new Chance()
            const addDaysToDate = (date, n) => {
                const d = new Date(date);
                d.setDate(d.getDate() + n);
                return d.toISOString().split('T')[0];
            };
            const pages = await PagesSchema.find()
            const array = []
            pages.forEach(page => {
                const { location, type } = page

                let data

                if (type === 'page') {
                    data = {
                        "url": {
                            "loc": "https://www.mohammedfarish.com/" + location,
                            "changefreq": "weekly",
                        }
                    }
                }

                if (type === 'blog') {
                    const randNumber = chanceObj.integer({ min: 3, max: 6 }) * -1
                    data = {
                        "url": {
                            "loc": "https://www.mohammedfarish.com/blog/" + location,
                            "changefreq": "weekly",
                            "lastmod": addDaysToDate(new Date(), randNumber)
                        }
                    }
                }
                array.push(data)
            })

            const xml = builder.create('urlset', { encoding: 'UTF-8', version: '1.0', headless: false })
                .attribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
                .ele(array)
                .end({ pretty: true })

            res.setHeader('Content-Type', 'text/xml')
            res.write(xml)
            res.end()
            break;

        case 'POST':
            const { type, name, location } = req.body
            if (!type || !name || !location) return res.status(503).json(false)
            try {

                if (type === 'page' || type === 'blog') {

                    const authenticate = await auth(req)
                    if (!authenticate) return res.status(400).json('Unauthorised');

                    await PagesSchema.create({
                        type,
                        name,
                        location
                    })

                } else {
                    return res.status(503).json(false)
                }
                res.status(200).json(true)
            } catch (error) {
                res.status(503).json("Internal Server Error.")
            }
            break;

        default:
            res.status(404).json(false)
            break;

    }
}