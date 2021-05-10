import axios from 'axios'
import React, { Component } from 'react'

import styles from '../../styles/projects.module.css'

export default class Projects extends Component {
    constructor(props) {
        super(props)

        this.fetchLocation = this.fetchLocation.bind(this)
        this.fetchGithubData = this.fetchGithubData.bind(this)
        this.state = {
            location: 'loading',
            locationLastUpdate: 'never',
            githubRepo: 'loading',
            githubCommitMessage: 'loading'
        }
    }

    componentDidMount() {
        this.fetchGithubData()
        this.fetchLocation()
        this.timer = setInterval(() => {
            this.fetchLocation()
        }, 1000 * 30);
    }

    componentWillUnmount() {
        clearInterval(this.timer)
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
                        location: 'Unknown',
                        locationLastUpdate: 'never'
                    })
                }
            })
            .catch(() => {
                this.setState({
                    location: 'Unknown',
                    locationLastUpdate: 'never'
                })
            })
    }

    fetchGithubData() {
        axios.get('/api/updates')
            .then((response) => {
                const { github } = response.data
                if (github) {
                    const { repo, message } = github
                    this.setState({
                        githubRepo: repo,
                        githubCommitMessage: message
                    })
                } else {
                    this.setState({
                        githubRepo: 'Unknown',
                        githubCommitMessage: ''
                    })

                }
            })
            .catch(() => {
                this.setState({
                    githubRepo: 'Unknown',
                    githubCommitMessage: ''
                })
            })
    }

    render() {
        return (
            <div className={styles.projectsSection} >
                <div className={styles.projectsSectionHeaderSection}>
                    <span>Updates</span>
                </div>
                <div className={styles.projects}>
                    <div title="Fetched from the phone's GPS cordinates" className={styles.projectsItem}>
                        <div className={styles.projectsItemHeader}>
                            <span className={styles.projectsItemHeaderLogo} >📍</span>
                            <span className={styles.projectsItemHeaderTypo}>Last Known Location</span>
                        </div>
                        <div className={styles.projectsItemResultSection}>
                            <span className={styles.projectsItemResult}>{this.state.location}</span>
                            <span className={styles.projectsItemResultSmall}>Updated {this.state.locationLastUpdate}</span>
                        </div>
                    </div>
                    <div title="Fetched from Github" className={styles.projectsItem}>
                        <div className={styles.projectsItemHeader}>
                            <span className={styles.projectsItemHeaderLogo} >👨‍💻</span>
                            <span className={styles.projectsItemHeaderTypo}>Last Code Activity</span>
                        </div>
                        <div className={styles.projectsItemResultSection}>
                            <span className={styles.projectsItemResult}>{this.state.githubCommitMessage}</span>
                            <span className={styles.projectsItemResultSmall}>{this.state.githubRepo}</span>
                        </div>
                    </div>
                    <div title="Fetched from the phone's cordinates" className={styles.projectsItem}>
                        <div className={styles.projectsItemHeader}>
                            <span className={styles.projectsItemHeaderLogo} >📍</span>
                            <span className={styles.projectsItemHeaderTypo}>Last Known Location</span>
                        </div>
                        <div className={styles.projectsItemResultSection}>
                            <span className={styles.projectsItemResult}>{this.state.location}</span>
                            <span className={styles.projectsItemResultSmall}>Updated {this.state.locationLastUpdate}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
