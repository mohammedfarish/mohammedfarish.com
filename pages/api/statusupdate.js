import Drive from "drive-db";
import Moment from "moment-timezone";

import { sheetId, sheetTabs } from "../../utils/config/driveConfig";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      let lastUpdate = null;
      try {
        const db = await Drive({
          sheet: sheetId,
          tab: sheetTabs.statusUpdate,
        })
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
