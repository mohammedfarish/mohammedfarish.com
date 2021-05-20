/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import Link from "next/link";

import axios from "axios";
import styles from "../../styles/latestblog.module.css";

export default class LatestArticles extends Component {
  constructor(props) {
    super(props);

    this.fetchPosts = this.fetchPosts.bind(this);
    this.state = {
      posts: [],
      loadingText: "Fetching latest articles.",
      hideLoadingText: false,
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    axios.get("/api/blog/list?type=latest")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            posts: response.data,
            hideLoadingText: true,
          });
        } else {
          this.setState({
            posts: [],
            loadingText: "No articles posted yet.",
          });
        }
      })
      .catch(() => {
        this.setState({
          loadingText: "Error fetching articles.",
        });
      });
  }

  render() {
    return (
      <section>
        <div className={styles.blogpageHeader}>
          <span>Latest Articles.</span>
          <Link href="/blog">
            <button type="button" className={styles.blogpageHeaderButton}>View All</button>
          </Link>
        </div>
        <div>
          <div hidden={this.state.hideLoadingText} className={styles.latestBlogArticleLoading}>
            <span>{this.state.loadingText}</span>
          </div>
          {this.state.posts.map((item) => (
            <Link
              key={item.key}
              href={`/blog/${item.slug}`}
            >
              <a href={`/blog/${item.slug}`}>
                <div className={styles.blogItem}>
                  <span className={styles.blogItemDate}>{item.date}</span>
                  <span className={styles.blogItemTitle}>{item.title}</span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>
    );
  }
}
