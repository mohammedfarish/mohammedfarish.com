/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import Editor from "rich-markdown-editor";
import axios from "axios";
import Router from "next/router";

import CustomHead from "../../components/head/Head";
import MarkdownTheme from "../../components/markdown/MarkdownTheme";

import styles from "../../styles/newblogpost.module.css";

import verifyUser from "../../utils/functions/verify";

const NewArticle = ({ setSiteTitle }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [pageTitle, setPageTitle] = useState("New Blog Post | Mohammed Farish");
  const [slug, setSlug] = useState("");
  const [publish, setPublish] = useState(true);
  const [publishButtonColor, setPublishButtonColor] = useState("lightgreen");
  const [listed, setListed] = useState(true);
  const [listedButtonColor, setListedButtonColor] = useState("lightgreen");
  const [markdownValue, setMarkdownValue] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [disablePublishButton, setDisablePublishButton] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const onLoadPage = () => {
    let data = window.localStorage.getItem("content");
    if (data) {
      data = JSON.parse(data);
      const {
        content, title, publish, listed,
      } = data;

      if (!publish) {
        setPublishButtonColor("transparent");
        setPublish(false);
      }

      if (!listed) {
        setListedButtonColor("transparent");
        setListed(false);
      }

      if (!content && !title) return;

      if (content) {
        setMarkdownValue(content);
        setMarkdownContent(content);
      }

      if (title) {
        setBlogTitle(title);
        setPageTitle(`${title} - New Post | Mohammed Farish`);
        setSlug(encodeURI(title.split(" ").join("-").toLowerCase()));
      }
    } else {
      const data = {
        listed,
        publish,
      };
      window.localStorage.setItem("content", JSON.stringify(data));
    }
  };

  const onChangeBlogTitle = (e) => {
    setBlogTitle(e.target.value);

    if (e.target.value) {
      setPageTitle(`${e.target.value.trim()} - New Post | Mohammed Farish`);
      setSlug(encodeURI(e.target.value.trim().split(" ").join("-").toLowerCase()));
    } else {
      setPageTitle("New Blog Post | Mohammed Farish");
      setSlug("");
    }

    const data = {
      content: markdownValue,
      title: e.target.value.trim(),
      publish,
      listed,
    };
    window.localStorage.setItem("content", JSON.stringify(data));
  };

  const onChangeMarkdown = (e) => {
    setMarkdownValue(e());

    const data = {
      content: e(),
      title: blogTitle,
      publish,
      listed,
    };
    window.localStorage.setItem("content", JSON.stringify(data));
  };

  const onFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    axios.post("/api/blog/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response.data);
      });
    console.log(formData);
  };

  const onChangeStatus = (status) => {
    let data = window.localStorage.getItem("content");

    if (status === "listed") {
      if (data) {
        data = JSON.parse(data);
        const { content } = data;
        let {
          title, publish, listed,
        } = data;
        if (listed) {
          listed = false;
          setListedButtonColor("transparent");
          setListed(false);
        } else {
          listed = true;
          setListedButtonColor("lightgreen");
          setListed(true);
        }
        data = {
          content, title, publish, listed,
        };
      }

      if (listed) {
        setListedButtonColor("transparent");
        setListed(false);
      } else {
        setListedButtonColor("lightgreen");
        setListed(true);
      }
    }

    if (status === "publish") {
      if (data) {
        data = JSON.parse(data);
        let {
          content, title, publish, listed,
        } = data;
        if (publish) {
          publish = false;
          setPublishButtonColor("transparent");
          setPublish(false);
        } else {
          publish = true;
          setPublishButtonColor("lightgreen");
          setPublish(true);
        }

        data = {
          content, title, publish, listed,
        };
      }
      if (publish) {
        setPublishButtonColor("transparent");
        setPublish(false);
      } else {
        setPublishButtonColor("lightgreen");
        setPublish(true);
      }
    }

    window.localStorage.setItem("content", JSON.stringify(data));
  };

  const onClickPublish = () => {
    if (markdownValue === "\\\n"
            || !blogTitle
            || !markdownValue) return setErrMessage("Error! Cannot publish empty content.");

    setDisablePublishButton(true);

    let content = markdownContent;
    const title = blogTitle;

    if (markdownContent !== markdownValue) {
      content = markdownValue;
    }

    const data = {
      content, title, listed, publish,
    };

    return axios.post("/api/blog/post", data, {
      headers: {
        "x-auth-token": window.localStorage.getItem("user"),
      },
    })
      .then((response) => {
        if (response.data === true) {
          window.localStorage.removeItem("content");
          Router.push("/blog");
        }
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 400) {
          setDisablePublishButton(false);
          setErrMessage("Error! Please make sure that you're logged in with a valid account credential.");
        } else {
          setDisablePublishButton(false);
          setErrMessage(`Error! ${err.message}`);
        }
      });
  };

  const verifyOnLoad = async () => {
    const userVerified = await verifyUser();
    if (userVerified) {
      onLoadPage();
    } else {
      window.localStorage.removeItem("user");
      Router.push("/blog");
    }
  };

  useEffect(() => {
    setSiteTitle("");
    verifyOnLoad();
  }, []);

  return (
    <div className={styles.newblogpostpage}>
      <CustomHead title={pageTitle} />
      <span className={styles.newBlogPostErrorMessage}>{errMessage}</span>
      <div className={styles.newBlogPostPublishButtonSection}>
        <button
          type="button"
          className={styles.newBlogPostPublishButton}
          disabled={disablePublishButton}
          onClick={onClickPublish}
        >
          PUBLISH

        </button>
      </div>
      <div className={styles.blogStatusSection}>
        <span role="status" style={{ background: publishButtonColor }} onClick={() => onChangeStatus("publish")} className={styles.blogStatusSectionItem}>PUBLISH</span>
        <span role="status" style={{ background: listedButtonColor }} onClick={() => onChangeStatus("listed")} className={styles.blogStatusSectionItem}>LISTED</span>
      </div>
      <input
        className={styles.newBlogPostField}
        type="text"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        placeholder="Add title"
        value={blogTitle}
        onChange={onChangeBlogTitle}
      />
      <div className={styles.newBlogPostSlug}>
        <span>
          Blog Post URL: https://www.mohammedfarish.com/blog/
          {slug}
        </span>
      </div>
      <div className={styles.newBlogPostEditor}>
        <Editor
          className={styles.newBlogPostEditor}
          value={markdownContent}
          onChange={onChangeMarkdown}
          dictionary
          onCancel={() => console.log("cancelled")}
          theme={MarkdownTheme}
          uploadImage={async (file) => {
            console.log(file);
            onFileUpload(file);
            return "https://cdn.discordapp.com/attachments/726328135393476609/832274177247150130/Logo_1.png";
          }}
        />
      </div>
    </div>
  );
};

export default NewArticle;
