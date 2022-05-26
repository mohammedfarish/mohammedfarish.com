import axios from "axios";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const { q } = req.query;
      const result = await axios.get(`https://imsea.herokuapp.com/api/1?q=${q}`)
        .then((response) => response.data.results[0])
        .catch(() => null);

      res.send(result);
      break;

    default:
      res.json(false);
      break;
  }
};
