import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Moment from "moment-timezone";

import Error404 from "../404";
import CustomHead from "../../components/head/Head";

const Markdown = dynamic(() => import("../../components/markdown/Markdown"), { ssr: false });

function BlogPost({ data, metaData }) {
  if (!data) {
    return <Error404 />;
  }

  return (
    <>
      <CustomHead
        title={metaData.title}
        content={metaData.description}
        image={metaData.image}
        siteData={{
          type: "blog",
          pubDate: metaData.date,
          modDate: metaData.updatedAt,
          tags: metaData.tags,
        }}
      />
      <div className="w-full min-h-[67vh] xs:mt-[5vh] flex flex-col items-center">
        {!metaData.public ? (
          <div className="mb-5 flex flex-col justify-center items-center select-none">
            <span className="text-xs px-3 py-1 bg-mf-black text-white font-bold">Private Post</span>
            <span className="text-xs mt-2">This post is not visible to the public.</span>
          </div>
        ) : (
          <div hidden />
        )}
        <h1 className="font-extrabold text-6xl xs:text-4xl text-center">{metaData.title}</h1>
        <span className="text-sm mt-4">{Moment(metaData.date).format("dddd • MMMM DD YYYY")}</span>
        {metaData.updatedAt !== metaData.date ? (
          <span className="text-xs mb-4 opacity-50">
            {" "}
            Last updated
            {" "}
            {Moment(metaData.updatedAt).fromNow()}
          </span>
        ) : (
          <div hidden />
        )}
        <div className="lg:w-1/2 sm:w-full lg:text-justify text-left w-full">
          <Markdown text={data} />
        </div>
      </div>
    </>
  );
}

export default BlogPost;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(ctx) {
  const githubData = await axios.get(`https://api.github.com/repos/${process.env.GITHUB_PRIVATE_ACCOUNT}/mohammedfarish.com-sitedata/contents/blog`, {
    auth: {
      username: "mohammedfarish",
      password: process.env.GITHUB_TOKEN,
    },
  })
    .then((response) => response.data)
    .catch((error) => error);

  const metaDataFile = githubData.find((item) => item.name === "data.json");

  const metaData = await axios.get(metaDataFile.download_url, {
    auth: {
      username: "mohammedfarish",
      password: process.env.GITHUB_TOKEN,
    },
  })
    // eslint-disable-next-line max-len
    .then((response) => response.data.find((item) => item.slug.toLowerCase() === ctx.params.slug.toLowerCase() && item.publish === true))
    .catch((error) => error);

  if (!metaData) {
    return {
      props: { data: null },
    };
  }

  const blogFileURL = githubData.find((item) => item.name === `${metaData.id}.md`).download_url;

  const data = await axios.get(blogFileURL, {
    auth: {
      username: "mohammedfarish",
      password: process.env.GITHUB_TOKEN,
    },
  })
    .then((response) => response.data)
    .catch((error) => error);

  function removeSpecialCharacters(str) {
    return str.replace(/[^a-zA-Z0-9 ]/g, "");
  }

  const content = data.split("---")[2];

  return {
    props: {
      metaData: {
        title: metaData.title,
        date: Moment(metaData.date).format(),
        updatedAt: Moment(metaData.updatedAt).format(),
        public: metaData.public || false,
        description: metaData.description || removeSpecialCharacters(content),
        image: metaData.image || null,
      },
      data,
    },
  };
}
