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
                const moment = Moment(launchData.win_open).tz(tz).fromNow();

                const mission = launchData.name;
                const dateEstimate = launchData.date_str;
                const launchCompany = launchData.provider.name;
                const vehicleName = launchData.vehicle.name;
                const locationName = launchData.pad.location.name;
                const countryName = launchData.pad.location.country;

                return `${launchCompany} is launching ${vehicleName} for ${mission} Mission, ${moment === "Invalid date" ? `${Moment(dateEstimate, "MMM DD").tz(tz).fromNow()} (estimated)` : moment}, from ${locationName}, ${countryName}.\n\nNote: ${moment === "Invalid date" ? "The time will be available momentarily and may be subjected to change" : "The date may be subjected to change"}.`;
              });

            res.json({ launchData: nextLaunch });
          } catch (error) {
            res.status(503).json({ launchData: "Internal Server Error!" });
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
