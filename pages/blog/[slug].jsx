import React, { useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Moment from "moment-timezone";
import Head from "next/head";

import Error404 from "../404";

const Markdown = dynamic(() => import("../../components/markdown/Markdown"), { ssr: false });

function BlogPost({ data, metaData, setSiteTitle }) {
  if (!data) {
    return <Error404 setSiteTitle={setSiteTitle} />;
  }

  useEffect(() => {
    setSiteTitle(metaData.title);
    return () => {
      setSiteTitle(null);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{metaData.title ? `${metaData.title} - Mohammed Farish` : "Mohammed Farish"}</title>
        <meta name="description" content={metaData.description || "Originally from Kerala, India, Farish is now an innovative backend developer working on futuristic projects. "} />
        <meta property="og:title" content={metaData.title ? `${metaData.title} - Mohammed Farish` : "Mohammed Farish"} />
        <meta property="og:description" content={metaData.description || "Originally from Kerala, India, Farish is now an innovative backend developer working on futuristic projects. "} />
        <meta property="twitter:title" content={metaData.title ? `${metaData.title} - Mohammed Farish` : "Mohammed Farish"} />
        <meta property="twitter:description" content={metaData.description || "Originally from Kerala, India, Farish is now an innovative backend developer working on futuristic projects. "} />
      </Head>
      <div className="w-full min-h-[67vh] flex flex-col items-center">
        {!metaData.public ? (
          <span className="text-xs mb-5 px-3 py-1 bg-mf-black text-white select-none font-bold">Private Post</span>
        ) : (
          <div hidden />
        )}
        <span className="font-extrabold text-6xl xs:text-4xl">{metaData.title}</span>
        <span className="text-sm my-4">{Moment(metaData.date).format("dddd • MMMM DD YYYY")}</span>
        <div className="lg:w-1/2 sm:w-full lg:text-justify text-left">
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

  return {
    props: {
      metaData: {
        title: metaData.title,
        date: Moment(metaData.date, "DD-MM-YYYY").format(),
        public: metaData.public || false,
        description: metaData.description || removeSpecialCharacters(data.split("\n\n")[0]),
      },
      data,
    },
  };
}
