import React, { Component } from 'react'

import styles from '../styles/homepage.module.css'

import LatestArticles from '../components/latest articles/LatestArticles'
import GetInTouch from '../components/contact/GetInTouch'
import Updates from '../components/updates/Updates'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.calculateAge = this.calculateAge.bind(this)
    this.state = {
      age: 0
    }
  }

  componentDidMount() {
    this.calculateAge()
  }

  calculateAge() {
    const todayYear = new Date().getFullYear()
    const birthYear = 1997
    this.setState({
      age: todayYear - birthYear
    })
  }

  render() {
    return (
      <div className={styles.homepage}>
        <div className={styles.homepageherosection}>
          <div className={styles.homepagesectionLHS}>
            <h1>I'm Mohammed Farish.</h1>
            <span>I'm a {this.state.age}-year old self-taught fullstack web and software developer, and I'm also one of the founders of <a className={styles.homepageamnuzlink} href="https://www.amnuz.com" target="https://www.amnuz.com">Amnuz Technologies</a>, a company that's deeply focused on the most futuristic projects you can imagine.</span>
          </div>
        </div>
        <div className={styles.homepagesection}>
          <Updates />
        </div>
        <div hidden className={styles.homepagesection}>
          <LatestArticles />
        </div>
        <div className={styles.homepagesection}>
          <GetInTouch />
        </div>
      </div>
    )
  }
}
