import axios from 'axios'
import React, { Component } from 'react'
// import Link from 'next/link'

import styles from '../styles/homepage.module.css'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.fetchAge = this.fetchAge.bind(this)
    this.fetchLocation = this.fetchLocation.bind(this)
    this.state = {
      age: 0,
      location: 'loading',
      locationLastUpdate: 'loading'
    }
  }

  componentDidMount() {
    this.fetchAge()
    this.fetchLocation()
  }

  fetchAge() {
    const todayYear = new Date().getFullYear()
    const birthYear = 1997
    this.setState({
      age: todayYear - birthYear
    })
  }

  fetchLocation() {
    axios.get('/api/location')
      .then(response => {
        if (response.data) {
          const { location, lastUpdate } = response.data
          this.setState({
            location,
            locationLastUpdate: lastUpdate
          })
        } else {
          this.setState({
            location: '',
            locationLastUpdate: ''
          })
        }
      })
      .catch(() => {
        this.setState({
          location: '',
          locationLastUpdate: ''
        })
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
          <div className={styles.homepagesectionRHS}>

          </div>
        </div>
        {/* <div className={styles.homepagesection}> */}
        {/* <h1>helloo</h1> */}
        {/* </div> */}
      </div>
    )
  }
}
