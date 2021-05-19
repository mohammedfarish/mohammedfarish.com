import React from 'react'
import Editor from "rich-markdown-editor";
import axios from 'axios'

import styles from '../../styles/blogpost.module.css'

import CustomHead from '../../components/head/Head';
import ErrorPage from '../404'

import MarkdownTheme from '../../components/markdown/MarkdownTheme';

const BlogPost = ({ content, title, date, success }) => {

    if (success === true) {
        return (
            <div className={styles.blogPostPage}>
                <CustomHead title={title + " - Blog | Mohammed Farish"} />
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
        )
    } else {
        return <ErrorPage />
    }

}

export default BlogPost


export async function getServerSideProps(context) {
    const slug = context.query.slug

    const fetch = await axios.get('https://www.mohammedfarish.com/api/blog/post?q=' + slug)
        .then(response => {
            if (response.data) return { success: true, ...response.data }
            return { success: false }
        })
        .catch(() => {
            return { success: false }
        })

    return { props: fetch }
}
