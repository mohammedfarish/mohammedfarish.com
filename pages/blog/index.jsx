import React, { useEffect } from "react";

import BlogPosts from "../../components/all blog posts/BlogPosts";

import styles from "../../styles/blog.module.css";

const index = ({ setSiteTitle }) => {
  useEffect(() => {
    setSiteTitle("Blog");

    return () => {
      setSiteTitle(null);
    };
  }, []);

  return (
    <div className={styles.blogpage}>
      <BlogPosts />
    </div>
  );
};

export default index;
