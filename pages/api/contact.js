/* eslint-disable no-case-declarations */
import Moment from "moment-timezone";

import host from "../../utils/middlewares/host";
import rateLimiter from "../../utils/middlewares/rateLimiter";
import getIP from "../../utils/middlewares/getIP";
import auth from "../../utils/middlewares/auth";

import dbConnect from "../../utils/database/dbConnect";

import contactMessageSchema from "../../utils/database/schema/contactMessageSchema";
import mailConnect from "../../utils/config/mailConnect";

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

        const transport = await mailConnect();

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

        if (email) {
          await transport.sendMail({
            from: {
              name,
              address: "no-reply@mohammedfarish.com",
            },
            to: "contact@mohammedfarish.com",
            subject,
            replyTo: email,
            text: message,
          }).then(() => {
            transport.sendMail({
              from: {
                name: "no-reply@mohammedfarish.com",
                address: "no-reply@mohammedfarish.com",
              },
              to: {
                name,
                address: email,
              },
              subject: "Message received!",
              text: `Dear ${name},\n\nThis is an automated email to let you know that I have received your message and I will try to respond to you, immediately.\n\nRegards,\nMohammed Farish`,
              replyTo: "contact@mohammedfarish.com",
            });
          });
        } else {
          await transport.sendMail({
            from: {
              name: "mohammedfarish.com",
              address: "no-reply@mohammedfarish.com",
            },
            to: "contact@mohammedfarish.com",
            subject: "New Contact Message!",
            text: `Name: ${name}\n\nSubject: ${subject}\n\nMessage: ${message}`,
          });
        }

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
