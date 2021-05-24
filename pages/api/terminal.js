import axios from "axios";
import Moment from "moment-timezone";

export default async (req, res) => {
  const { method } = req;
  const { q } = req.query;

  switch (method) {
    case "GET":
      switch (q) {
        case "rockets":
          try {
            const { tz } = req.query;
            const nextLaunch = await axios.get("https://fdo.rocketlaunch.live/json/launches/next/1")
              .then((response) => {
                const { result } = response.data;
                if (result.length === 0) return "Unknown";
                const launchData = result[0];
                const { location } = launchData.pad;
                const moment = Moment(launchData.win_open).tz(tz).fromNow();
                const mission = launchData.name;
                const launchCompany = launchData.provider.name;
                const vehicleName = launchData.vehicle.name;
                return `${launchCompany} is launching ${vehicleName} for ${mission} Mission, ${moment}, from ${location.name}.\n\nNote: The date is subjected to change.`;
              });
            res.json(nextLaunch);
          } catch (error) {
            res.json("Unknown");
          }
          break;

        default:
          res.json(false);
          break;
      }
      break;

    default:
      res.status(404).json(false);
      break;
  }
};
