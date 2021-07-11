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
            const nextLaunch = await axios.get(`${process.env.R_API_URI}5`)
              .then((response) => {
                const { result } = response.data;

                if (result.length === 0) return "Unknown";

                const momenNnow = Moment().tz(tz).unix();
                const momenThen = Moment(result[0].win_open).tz(tz).unix();
                const difference = momenNnow - momenThen;

                let launchData = result[0];
                if (difference >= 0) {
                  // eslint-disable-next-line prefer-destructuring
                  launchData = result[1];
                }
                const { location } = launchData.pad;

                const moment = Moment(launchData.win_open).tz(tz).fromNow();
                const mission = launchData.name;
                const launchCompany = launchData.provider.name;
                const vehicleName = launchData.vehicle.name;

                return `${launchCompany} is launching ${vehicleName} for ${mission} Mission, ${moment}, from ${location.name}.\n\nNote: The date is subjected to change.`;
              });
            res.json(nextLaunch);
          } catch (error) {
            res.json("Internal Server Error!");
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
