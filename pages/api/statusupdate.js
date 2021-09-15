import Moment from "moment-timezone";

import { driveFetch, tabs } from "../../utils/config/driveConfig";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      let lastUpdate = null;
      try {
        const db = await driveFetch(tabs.statusUpdate)
          .catch(() => null);

        if (db) {
          const { date, content } = db.reverse()[0];
          if (!date || !content) {
            lastUpdate = null;
          } else {
            lastUpdate = {
              date: Moment(date).tz("Asia/Dubai").fromNow(),
              content,
            };
          }
        }

        res.json(lastUpdate);
      } catch (error) {
        res.json(null);
      }
      break;

    default:
      res.status(404).json(false);
      break;
  }
};
