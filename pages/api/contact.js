/* eslint-disable no-case-declarations */
import Moment from "moment-timezone";

import host from "../../utils/middlewares/host";
import rateLimiter from "../../utils/middlewares/rateLimiter";
import getIP from "../../utils/middlewares/getIP";
import auth from "../../utils/middlewares/auth";

import dbConnect from "../../utils/database/dbConnect";

import contactMessageSchema from "../../utils/database/schema/contactMessageSchema";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":

      try {
        const validHost = await host(req);
        if (!validHost) return res.status(400).json(false);

        const inRateLimit = await rateLimiter(req);
        if (!inRateLimit) return res.status(429).json(false);

        const ip = await getIP(req);
        if (!ip) return res.status(400).json(false);

        const {
          message, subject, name, email, uid,
        } = req.body;

        if (!message || !subject || !name) return res.json(false);

        await contactMessageSchema.create({
          name,
          email,
          subject,
          message,
          ip,
          read: false,
          deviceId: uid,
          date: Moment().tz("Asia/Dubai").format(),
        });

        res.json(true);
      } catch (error) {
        res.json(false);
      }

      break;

    case "GET":
      const authenticate = await auth(req);
      if (!authenticate) return res.status(400).json("Unauthorised");
      try {
        const contectMessages = await contactMessageSchema.find()
          .sort({
            date: -1,
          });

        const msgs = [];

        contectMessages.forEach((item) => {
          const {
            name, email, subject, message, read, date, deviceId, _id,
          } = item;

          msgs.push({
            id: _id,
            name,
            email,
            message,
            subject,
            read,
            date: Moment(date).tz("Asia/Dubai").format(),
            dateFormatted: Moment(date).tz("Asia/Dubai").fromNow(),
            deviceId,
          });
        });

        res.json(msgs);
      } catch (error) {
        res.json(false);
      }
      break;

    case "PUT":
      try {
        const checkAuth = await auth(req);
        if (!checkAuth) return res.status(400).json(false);
        const { id, read } = req.body;
        if (!id || read !== false) return res.json(false);

        await contactMessageSchema.findByIdAndUpdate(id, {
          read: true,
        });

        res.json(true);
      } catch (error) {
        res.json(false);
      }
      break;

    default:
      res.status(404).json(false);
      break;
  }
  return true;
};
