/* eslint-disable no-case-declarations */
import Chance from "chance";
import Moment from "moment-timezone";

import axios from "axios";
import dbConnect from "../../utils/database/dbConnect";
import getIP from "../../utils/middlewares/getIP";

import analyticsSchema from "../../utils/database/schema/analyticsSchema";
import auth from "../../utils/middlewares/auth";

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

          const parsedUserAgent = await axios.get("https://api.apicagent.com/", {
            params: {
              ua: userAgent,
            },
          }).then((resp) => {
            const { browser_family: browserFamily } = resp.data;
            if (!browserFamily) {
              const { category } = resp.data;
              if (category === "Search bot") {
                return false;
              }
            }
            return true;
          })
            .catch(() => true);

          if (!parsedUserAgent) return res.json(false);

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

    case "GET":
      try {
        const authenticate = await auth(req);
        if (!authenticate) return res.status(400).json(false);

        const analyticsDBData = await analyticsSchema.find()
          .sort({ lastActivity: -1 });

        const uniqueVisitorsCount = analyticsDBData.length;
        let totalVisits = 0;
        const activityDataArray = [];
        analyticsDBData.forEach(async (data) => {
          const {
            _id,
            userAgent,
            visitCount,
            activityData,
            remarks,
            initialActivity,
            lastActivity,
          } = data;

          totalVisits += visitCount;

          const formatted = {
            id: _id,
            userAgent,
            visitCount,
            activityData: activityData.reverse(),
            remarks,
            initialActivity,
            lastActivity,
            lastActivityFomatted: Moment(lastActivity).tz("Asia/Dubai").fromNow(),
            lastActivityUnix: Moment(lastActivity).tz("Asia/Dubai").unix(),
          };

          activityDataArray.push(formatted);
        });

        const data = {
          totalVisits, uniqueVisitorsCount, activityDataArray,
        };

        return res.json({ success: true, ...data });
      } catch (error) {
        res.status(500).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const token = req.headers["x-auth-token"];
        await analyticsSchema.findOneAndDelete({ _id: token });
        res.json(true);
      } catch (error) {
        res.json(true);
      }
      break;

    default:
      res.status(404).json(false);
      break;
  }
  return true;
};
