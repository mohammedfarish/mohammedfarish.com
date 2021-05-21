/* eslint-disable react/prop-types */
import React from "react";
import Editor from "rich-markdown-editor";
import Moment from "moment-timezone";

import styles from "../../styles/blogpost.module.css";

import CustomHead from "../../components/head/Head";
import ErrorPage from "../404";

import MarkdownTheme from "../../components/markdown/MarkdownTheme";

import dbConnect from "../../utils/database/dbConnect";
import blogSchema from "../../utils/database/schema/blogSchema";

const BlogPost = ({
  content, title, date, success,
}) => {
  if (success === true) {
    return (
      <div className={styles.blogPostPage}>
        <CustomHead title={`${title} - Blog | Mohammed Farish`} />
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
            readOnly
            readOnlyWriteCheckboxes
            theme={MarkdownTheme}
          />
        </div>
      </div>
    );
  }

  return <ErrorPage />;
};

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
