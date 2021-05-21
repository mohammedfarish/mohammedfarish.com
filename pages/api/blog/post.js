/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-case-declarations */
import Moment from "moment-timezone";

import auth from "../../../utils/middlewares/auth";

import dbConnect from "../../../utils/database/dbConnect";
import blogSchema from "../../../utils/database/schema/blogSchema";
import rateLimiter from "../../../utils/middlewares/rateLimiter";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":

      const inRateLimit = await rateLimiter(req);
      if (!inRateLimit) return res.status(429).json(false);

      let {
        title, slug, content, listed, publish,
      } = req.body;
      if (!title || !content) return res.json(false);
      try {
        const authenticate = await auth(req);
        if (!authenticate) return res.status(400).json("Unauthorised");

        if (!slug) { slug = title.toLowerCase().split(" ").join("-"); }

        const author = {
          id: req.user.id,
          ip: req.user.ip,
        };

        await blogSchema.create({
          title,
          slug,
          date: Moment().tz("Asia/Dubai").format(),
          content,
          author,
          publish,
          listed,
        });

        res.json(true);
      } catch (error) {
        res.status(503).json(false);
      }
      break;

    default:
      res.status(404).json(false);
      break;
  }
  return true;
};
