/* eslint-disable no-case-declarations */
export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "PUT":
      // const { type } = req.query;

      // console.log(type);
      res.json(true);
      break;

    default:
      res.status(404).json(false);
      break;
  }
};
