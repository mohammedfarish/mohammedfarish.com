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
                let launchDataMessage;
                result.forEach((launchData) => {
                  const momenNnow = Moment().tz(tz).unix();
                  const momenThen = Moment(launchData.win_open).tz(tz).unix();

                  const difference = momenThen - momenNnow;
                  const difference2 = Moment(launchData.date_str).tz(tz).unix() - momenNnow;

                  if (difference <= 0) return;
                  if (launchDataMessage) return;

                  const moment = Moment(launchData.win_open).tz(tz).fromNow();
                  if (moment === "Invalid date" && difference2 <= 0) return;

                  const mission = launchData.name;
                  const launchCompany = launchData.provider.name;
                  const dateEstimate = launchData.date_str;
                  const vehicleName = launchData.vehicle.name;
                  const locationName = launchData.pad.location.name;
                  const countryName = launchData.pad.location.country;

                  launchDataMessage = `${launchCompany} is launching ${vehicleName} for ${mission} Mission, ${moment === "Invalid date" ? `${Moment(dateEstimate, "MMM DD").tz(tz).fromNow()} (estimated)` : moment}, from ${locationName}, ${countryName}.\n\nNote: ${moment === "Invalid date" ? "The time will be available momentarily and may be subjected to change" : "The date may be subjected to change"}.`;
                });

                return launchDataMessage;
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
