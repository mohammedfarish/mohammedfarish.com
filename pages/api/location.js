import Moment from "moment-timezone";

import dbConnect from "../../utils/database/dbConnect";

import deviceLocationHistory from "../../utils/database/schema/deviceLocationHistory";

import deviceAuth from "../../utils/middlewares/deviceAuth";
import rateLimiter from "../../utils/middlewares/rateLimiter";
import host from "../../utils/middlewares/host";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  const validHost = await host(req);
  if (!validHost) return res.status(400).json(false);

  switch (method) {
    case "POST":
      try {
        const authenticate = await deviceAuth(req);
        if (!authenticate) return res.status(400).json(false);

        const {
          location, latlon, wifi, batteryLevel, device,
        } = req.body;
        if (!location
                    || !latlon
                    || !wifi
                    || !batteryLevel
                    || !device) return res.status(400).json(false);

        await deviceLocationHistory.create({
          location,
          latlon,
          wifi,
          batteryLevel,
          device,
          time: Moment().tz("Asia/Dubai").format(),
        });

        res.json(true);
      } catch (error) {
        res.json(false);
      }
      break;

    case "GET":
      try {
        const inRateLimit = await rateLimiter(req, 60);
        if (!inRateLimit) return res.status(429).json(false);

        const locationData = await deviceLocationHistory.find()
          .sort({
            time: -1,
          })
          .limit(1);
        const { location: locationInfo, time } = locationData[0];

        const data = {
          location: locationInfo,
          last_update: Moment(time).tz("Asia/Dubai").fromNow(),
        };

        res.json(data);
      } catch (error) {
        res.status(503).json("Internal Server Error.");
      }
      break;

    default:
      res.status(404).json(false);
      break;
  }
  return true;
};
