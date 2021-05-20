/* eslint-disable no-case-declarations */
/* eslint-disable no-plusplus */
import axios from "axios";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":

      let online = 0;
      let offline = 0;

      axios.post("https://api.uptimerobot.com/v2/getMonitors", null, {
        params: {
          api_key: process.env.UPTIME_ROBOT_API_KEY,
        },
      })
        .then((response) => {
          const { monitors } = response.data;

          monitors.forEach((monitor) => {
            const { status } = monitor;
            if (status === 2) return online++;
            return offline++;
          });

          const result = {
            status: "online",
            servers: {
              online,
              offline,
            },
          };

          res.json(result);
        })
        .catch(() => {
          online = null;
          offline = null;

          const response = {
            status: "Something went wrong. Please check with the hosting provider.",
            servers: {
              online,
              offline,
            },
          };

          res.json(response);
        });

      break;

    default:
      res.status(404).json(false);
      break;
  }
};
