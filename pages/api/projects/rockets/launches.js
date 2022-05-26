import axios from "axios";
import Moment from "moment-timezone";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const { id, page } = req.query;

      if (!id || !page) return res.json("not ok");
      const pastLaunches = await axios.get(`${process.env.R_API_URI}/json/launches/`, {
        headers: {
          Authorization: `Bearer ${process.env.R_API_TOKEN}`,
        },
        params: {
          before_date: Moment().tz("Asia/Dubai").format("YYYY-MM-DD"),
          location_id: id,
          page,
        },
      })
        .then((response) => response.data.result.reverse())
        .catch(() => []);

      const formatted = pastLaunches.map((launch) => ({
        id: launch.id,
        t0: launch.t0,
        win_open: launch.win_open,
        name: launch.name,
        vehicle: { name: launch.vehicle.name },
        pad: { name: launch.pad.name },
        provider: { name: launch.provider.name },
      }));

      res.json(formatted);
      break;
    default:
      res.json(false);
      break;
  }
  return true;
};
