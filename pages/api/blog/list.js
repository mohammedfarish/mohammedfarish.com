import axios from "axios";
import Moment from "moment-timezone";

export default async (req, res) => {
  const { method } = req;
  const latest = req.query.type === "latest";
  switch (method) {
    case "GET":

      try {
        const githubData = await axios.get(`https://api.github.com/repos/${process.env.GITHUB_PRIVATE_ACCOUNT}/mohammedfarish.com-sitedata/contents/blog`, {
          auth: {
            username: "mohammedfarish",
            password: process.env.GITHUB_TOKEN,
          },
        })
          .then((response) => response.data)
          .catch((error) => error);

        const metaDataFile = githubData.find((item) => item.name === "data.json");

        const blogPosts = await axios.get(metaDataFile.download_url, {
          auth: {
            username: "mohammedfarish",
            password: process.env.GITHUB_TOKEN,
          },
        })
        // eslint-disable-next-line max-len
          .then((response) => response.data.filter((item) => item.publish === true && item.public === true))
          .catch((error) => error);

        const formattedData = blogPosts.map((item) => ({
          title: item.title,
          slug: item.slug,
          date: Moment(item.date, "DD-MM-YYYY").format(),
          unix: Moment(item.date, "DD-MM-YYYY").unix(),
        }));

        const sortedData = formattedData.sort((a, b) => a.unix - b.unix).reverse();
        if (latest && sortedData > 4) { sortedData.splice(4); }
        // console.log(sortedData);
        res.json(sortedData);
        // res.json([]);
      } catch (error) {
        res.status(503).json(false);
      }

      break;

    default:
      res.status(404);
      break;
  }
};
