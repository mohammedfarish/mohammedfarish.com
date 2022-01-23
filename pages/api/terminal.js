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

            let nextLaunch = await axios.get(`${process.env.R_API_URI}/json/launches/next`, {
              headers: {
                Authorization: `Bearer ${process.env.R_API_TOKEN}`,
              },
            })
              .then((response) => response.data.result)
              .catch(() => null);

            if (!nextLaunch) {
              nextLaunch = await axios.get(`${process.env.R_API_URI}/json/launches/next`)
                .then((response) => response.data.result)
                .catch(() => null);
            }

            const launchData = nextLaunch[0];
            const mission = launchData.name;
            const launchCompany = launchData.provider.name;
            const dateEstimate = launchData.date_str;
            const vehicleName = launchData.vehicle.name;
            const locationName = launchData.pad.location.name;
            const countryName = launchData.pad.location.country;
            const windowOpenDate = launchData.win_open;

            const moment = Moment(windowOpenDate).tz(tz).fromNow();

            const launchDataMessage = `${launchCompany} is launching ${vehicleName} for ${mission} Mission, ${moment === "Invalid date" ? `${Moment(dateEstimate, "MMM DD").tz(tz).fromNow()} (estimated)` : moment}, from ${locationName}, ${countryName}.\n\nNote: ${moment === "Invalid date" ? "The time will be available momentarily and may be subjected to change" : "The date may be subjected to change"}.`;

            res.json({ launchData: launchDataMessage });
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

  return true;
};
