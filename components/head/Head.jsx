import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function CustomHead({
  title, content,
  image, siteData,
}) {
  const [darkMode, setDarkMode] = useState(null);

  const location = useRouter();
  const defaultDescription = "Software Engineer, Web Developer and an Entrepreneur.";

  useEffect(() => {
    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(darkTheme);
  }, []);

  return (
    <Head>
      <title>{title ? `${title} - Mohammed Farish` : "Mohammed Farish"}</title>
      <link rel="icon" href={darkMode ? "/favicon-dark.svg" : "/favicon-light.svg"} />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content={content || defaultDescription} />

      {siteData && siteData.type === "blog" ? (
        <>
          <link rel="alternate" type="application/json+oembed" href={encodeURI(`/api/blog/oembed?title=${title}`)} />
          <meta property="og:type" content="article" />
          <meta property="article:published_time" content={siteData.pubDate} />
          <meta property="article:modified_time" content={siteData.modDate} />
          <meta property="article:author" content="Mohammed Farish" />
          <meta property="article:tag" content={siteData.tags ? siteData.tags.join(",") : null} />
        </>
      ) : (
        <meta property="og:type" content="website" />
      )}
      <meta property="og:site_name" content="Mohammed Farish" />
      <meta property="og:url" content={`https://www.mohammedfarish.com${location.asPath}`} />
      <meta property="og:title" content={title ? `${title} - Mohammed Farish` : "Mohammed Farish"} />
      <meta property="og:description" content={content || defaultDescription} />
      <meta property="og:image" content={image || "https://www.mohammedfarish.com/assets/seoimage.jpg"} />
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:creator" content="@faaaaaarish" />
      <meta name="twitter:site" content="@faaaaaarish" />
      <meta name="twitter:text:title" content={title ? `${title} - Mohammed Farish` : "Mohammed Farish"} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://www.mohammedfarish.com${location.asPath}`} />
      <meta property="twitter:title" content={title ? `${title} - Mohammed Farish` : "Mohammed Farish"} />
      <meta property="twitter:description" content={content || defaultDescription} />
      <meta property="twitter:image" content={image || "https://www.mohammedfarish.com/assets/seoimage.jpg"} />
    </Head>
  );
}

export default CustomHead;
