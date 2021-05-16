import React from 'react'

import BlogPosts from "../../components/all blog posts/BlogPosts";

import styles from '../../styles/blog.module.css'

const index = () => {
    return (
        <div className={styles.blogpage}>
            <BlogPosts />
        </div>
    )
}

export default index
