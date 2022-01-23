import React, { useEffect } from "react";
import Editor from "rich-markdown-editor";
import Moment from "moment-timezone";

import styles from "../../styles/blogpost.module.css";

import ErrorPage from "../404";

import MarkdownTheme from "../../components/markdown/MarkdownTheme";

import dbConnect from "../../utils/database/dbConnect";
import blogSchema from "../../utils/database/schema/blogSchema";

function BlogPost({
  content, title, date, success, setSiteTitle,
}) {
  if (success === true) {
    useEffect(() => {
      setSiteTitle(`${title} - Blog`);
      return () => {
        setSiteTitle(null);
      };
    }, []);

    return (
      <div className={styles.blogPostPage}>
        <div className={styles.blogPostTitle}>
          <span>{title}</span>
        </div>
        <div className={styles.blogPostDate}>
          <span>{date}</span>
        </div>
        <div className={styles.blogContent}>
          <Editor
            className={styles.blogPostEditor}
            defaultValue={content}
            theme={MarkdownTheme}
            readOnlyWriteCheckboxes
            readOnly
          />
        </div>
      </div>
    );
  }

  return <ErrorPage />;
}

export default BlogPost;

export async function getServerSideProps(context) {
  const { slug } = context.query;
  if (!slug) return { props: false };

  dbConnect();

  const data = await blogSchema.findOne({ slug })
    .then((blogData) => {
      const { title, content, date } = blogData;

      const moment = Moment(date).tz("Asia/Dubai").format("dddd • MMMM DD YYYY");

      return {
        success: true, title, content, date: moment,
      };
    })
    .catch(() => ({ success: false }));

  return { props: data };
}
