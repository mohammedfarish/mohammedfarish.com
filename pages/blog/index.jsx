import React from "react";

import BlogPosts from "../../components/all blog posts/BlogPosts";
import CustomHead from "../../components/head/Head";

import styles from "../../styles/blog.module.css";

const index = () => (
  <div className={styles.blogpage}>
    <CustomHead title="Blog | Mohammed Farish" />
    <BlogPosts />
  </div>
);

export default index;
