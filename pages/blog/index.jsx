import React, { useEffect } from "react";

import BlogPosts from "../../components/all blog posts/BlogPosts";
// import CustomHead from "../../components/head/Head";

import styles from "../../styles/blog.module.css";

const index = ({ setSiteTitle }) => {
  useEffect(() => {
    setSiteTitle("Blog");
  }, []);
  return (
    <div className={styles.blogpage}>
      <BlogPosts />
    </div>
  );
};

export default index;
