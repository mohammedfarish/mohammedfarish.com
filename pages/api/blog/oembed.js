export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      const { title } = req.query;
      const data = {
        version: "1.0",
        title,
        author_name: "Mohammed Farish",
        author_url: "https://www.mohammedfarish.com/",
        provider_name: encodeURI("Mohammed Farish"),
        provider_url: "https://www.mohammedfarish.com/",
        type: "rich",
      };

      res.setHeader("Content-Type", "application/json");
      res.json(data);
      break;

    default:
      res.status(404);
      break;
  }
};
