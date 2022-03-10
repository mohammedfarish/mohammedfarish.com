import React, { useEffect } from "react";
import Moment from "moment-timezone";
import axios from "axios";

import BlogPosts from "../../components/all blog posts/BlogPosts";

const index = ({ setSiteTitle, posts }) => {
  useEffect(() => {
    setSiteTitle("Blog");
    return () => {
      setSiteTitle(null);
    };
  }, []);

  return (
    <div className="w-full">
      <BlogPosts posts={posts} />
    </div>
  );
};

export default index;

export async function getServerSideProps() {
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

  return {
    props: {
      posts: sortedData,
    },
  };
}
