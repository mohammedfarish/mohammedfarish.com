import React, { Component } from 'react'
import Link from 'next/link'
import axios from 'axios'

import styles from '../../styles/blog.module.css'
import verifyUser from '../../utils/functions/verify'

export default class index extends Component {
    constructor(props) {
        super(props)

        this.verifyLoggedIn = this.verifyLoggedIn.bind(this)
        this.fetchPosts = this.fetchPosts.bind(this)
        this.state = {
            posts: [],
            hideNewArticleButton: true
        }
    }

    componentDidMount() {
        this.verifyLoggedIn()
        this.fetchPosts()
    }

    async verifyLoggedIn() {
        const user = window.localStorage.getItem('user');
        if (user) {
            this.setState({
                hideNewArticleButton: false
            })
            const verify = await verifyUser()
            if (!verify) {
                this.setState({
                    hideNewArticleButton: true
                })
                window.localStorage.removeItem('user');
            }
        }
    }

    fetchPosts() {
        axios.get('/api/blog/list')
            .then(response => {
                if (response.data) {
                    this.setState({
                        posts: response.data
                    })
                }
            })
    }

    render() {
        return (
            <div className={styles.blogpage}>
                <div className={styles.blogpageHeader}>
                    <span>Blog Articles.</span>
                    <Link href="/blog/new">
                        <button hidden={this.state.hideNewArticleButton} className={styles.blogpageHeaderButton}>New Article</button>
                    </Link>
                </div>
                <div>
                    {this.state.posts.map(item => {
                        return (
                            <Link
                                key={item.key} href={'/blog/' + item.slug}>
                                <a>
                                    <div className={styles.blogItem}>
                                        <span className={styles.blogItemDate}>{item.date}</span>
                                        <span className={styles.blogItemTitle}>{item.title}</span>
                                    </div>
                                </a>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}
