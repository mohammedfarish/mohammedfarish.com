import React, { Component } from 'react'
import Head from 'next/head'

import styles from '../styles/homepage.module.css'
import LatestArticles from '../components/latest articles/LatestArticles'
import Projects from '../components/projects/Projects'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.fetchAge = this.fetchAge.bind(this)
    this.state = {
      age: 0
    }
  }

  componentDidMount() {
    this.fetchAge()
  }

  fetchAge() {
    const todayYear = new Date().getFullYear()
    const birthYear = 1997
    this.setState({
      age: todayYear - birthYear
    })
  }


  render() {
    return (
      <div className={styles.homepage}>
        <Head>
          <title>Mohammed Farish</title>
          <link rel="icon" href="https://mohammedfarish.com/favicon.ico" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Originally from Kerala, India, Farish is now an innovative backend developer working on futuristic projects. Starting with Smart Technology, Farish works on projects involving the internet of things." />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.mohammedfarish.com/" />
          <meta property="og:title" content="Mohammed Farish" />
          <meta property="og:description" content="Originally from Kerala, India, Farish is now an innovative backend developer working on futuristic projects. Starting with Smart Technology, Farish works on projects involving the internet of things." />
          <meta property="og:image" content="https://www.mohammedfarish.com/assets/seoimage.jpg" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://www.mohammedfarish.com/" />
          <meta property="twitter:title" content="Mohammed Farish" />
          <meta property="twitter:description" content="Originally from Kerala, India, Farish is now an innovative backend developer working on futuristic projects. Starting with Smart Technology, Farish works on projects involving the internet of things." />
          <meta property="twitter:image" content="https://www.mohammedfarish.com/assets/seoimage.jpg" />
        </Head>
        <div className={styles.homepageherosection}>
          <div className={styles.homepagesectionLHS}>
            <h1>I'm Mohammed Farish.</h1>
            <span>I'm a {this.state.age}-year old self-taught fullstack web and software developer, and I'm also one of the founders of <a className={styles.homepageamnuzlink} href="https://www.amnuz.com" target="https://www.amnuz.com">Amnuz Technologies</a>, a company that's deeply focused on the most futuristic projects you can imagine.</span>
          </div>
          <div className={styles.homepagesectionRHS}>
          </div>
        </div>
        <div className={styles.homepagesection}>
          <Projects />
        </div>
        <div className={styles.homepagesection}>
          <LatestArticles />
        </div>
      </div>
    )
  }
}
