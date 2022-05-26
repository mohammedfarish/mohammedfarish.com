import React, { useEffect, useState } from "react";
import Moment from "moment-timezone";
import axios from "axios";
import { useRouter } from "next/router";

import BlogPosts from "../../components/all blog posts/BlogPosts";
import CustomHead from "../../components/head/Head";

const index = ({ posts }) => {
  const [formattedPosts, setFormattedPosts] = useState([]);

  const location = useRouter();

  useEffect(() => {
    const years = [];

    if (!posts || posts.length === 0) {
      return location.push("/");
    }

    posts.forEach((post) => {
      const year = Moment(post.date).format("YYYY");
      if (!years.includes(year)) {
        years.push(year);
      }
    });

    const formatted = years.map((year) => {
      const data = posts.filter((post) => Moment(post.date).format("YYYY") === year);
      return {
        year,
        data,
      };
    });

    return setFormattedPosts(formatted);
  }, []);

  return (
    <>
      <CustomHead title="Blog Articles" />
      <div className="w-3/4 flex flex-col items-center">
        <BlogPosts posts={formattedPosts} />
      </div>
    </>
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
    date: Moment(item.date).format(),
  }));

  formattedData.sort((a, b) => Moment(a.date).unix() - Moment(b.date).unix()).reverse();

  return {
    props: {
      posts: formattedData,
    },
  };
}
