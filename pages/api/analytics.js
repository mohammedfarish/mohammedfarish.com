/* eslint-disable no-case-declarations */
import Chance from "chance";
import Moment from "moment-timezone";

import dbConnect from "../../utils/database/dbConnect";
import getIP from "../../utils/middlewares/getIP";

import analyticsSchema from "../../utils/database/schema/analyticsSchema";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  const chance = new Chance();
  const moment = Moment().tz("Asia/Dubai");

  switch (method) {
    case "POST":
      const { uid } = req.body;
      try {
        let guid = null;
        let response = true;
        let visitCount = 0;

        if (uid === null) {
          const { userAgent, data: activityData } = req.body;

          guid = chance.guid({ version: 5 });

          response = { uid: guid };

          const data = {
            _id: guid,
            userAgent,
            activityData: {
              ...activityData,
              ip: await getIP(req),
              time: moment.format(),
            },
          };

          await analyticsSchema.create({
            ...data,
            initialActivity: moment.format(),
            lastActivity: moment.format(),
            visitCount: 1,
          });

          return res.json(response);
        }

        let { data: activityData } = req.body;

        if (activityData.type === "visit") {
          activityData = {
            ...activityData,
            ip: await getIP(req),
            time: moment.format(),
          };

          visitCount = 1;
        } else if (activityData.type === "browse") {
          activityData = {
            ...activityData,
            ip: await getIP(req),
            time: moment.format(),
          };
        } else if (activityData.type === "socialClick") {
          activityData = {
            ...activityData,
            ip: await getIP(req),
            time: moment.format(),
          };
        } else if (activityData.type === "contactFormSubmit") {
          activityData = {
            ...activityData,
            ip: await getIP(req),
            time: moment.format(),
          };
        } else {
          return res.json(false);
        }

        await analyticsSchema.findByIdAndUpdate(uid, {
          lastActivity: moment.format(),
          $addToSet: {
            activityData,
          },
          $inc: {
            visitCount,
          },
        });

        return res.json(response);
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
