/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import axios from "axios";
import React, { Component } from "react";

import styles from "../../styles/projects.module.css";

export default class Updates extends Component {
  constructor(props) {
    super(props);

    this.fetchLocation = this.fetchLocation.bind(this);
    this.fetchGithubData = this.fetchGithubData.bind(this);
    this.fetchActiveAPIs = this.fetchActiveAPIs.bind(this);
    this.onClickReloadData = this.onClickReloadData.bind(this);
    this.state = {
      location: "loading",
      locationLastUpdate: "never",
      githubRepo: "loading",
      githubCommitMessage: "loading",
      activeAPIs: "loading",
    };
  }

  componentDidMount() {
    this.fetchGithubData();
    this.fetchLocation();
    this.fetchActiveAPIs();
    this.timer = setInterval(() => {
      this.fetchLocation();
    }, 1000 * 30);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onClickReloadData(type) {
    if (type === 1) { return this.fetchLocation(true); }

    if (type === 2) { return this.fetchGithubData(true); }

    if (type === 3) { return this.fetchActiveAPIs(true); }
    return true;
  }

  fetchActiveAPIs(refresh) {
    if (this.state.APICalls >= 20) return;

    this.setState({
      APICalls: this.state.APICalls + 1,
    });

    if (refresh) {
      this.setState({
        activeAPIs: "updating",
      });
    }

    axios.get("api/updates?q=api")
      .then((response) => {
        if (response.data) {
          const { active } = response.data;
          if (active === 1) {
            this.setState({
              activeAPIs: `${active} Server`,
            });
          } else {
            this.setState({
              activeAPIs: `${active} Servers`,
            });
          }
        }
      })
      .catch(() => {
        this.setState({
          activeAPIs: `${0} Servers`,
        });
      });
  }

  fetchGithubData(refresh) {
    if (this.state.APICalls >= 20) return;

    this.setState({
      APICalls: this.state.APICalls + 1,
    });

    if (refresh) {
      this.setState({
        githubRepo: "updating",
        githubCommitMessage: "updating",
      });
    }

    axios.get("https://api.github.com/users/mohammedfarish/events/public")
      .then((response) => {
        const { data: github } = response;

        const githubData = [];

        github.forEach((data) => {
          const { payload, type, repo } = data;
          if (githubData.length >= 1) return;
          if (type === "PushEvent") {
            data = {
              repo: repo.name,
              message: payload.commits[0].message,
            };
            githubData.push(data);
          }
        });

        const { repo, message } = githubData[0];

        this.setState({
          githubRepo: repo,
          githubCommitMessage: message,
        });
      })
      .catch(() => {
        this.setState({
          githubRepo: "Unknown",
          githubCommitMessage: "",
        });
      });
  }

  fetchLocation(refresh) {
    if (this.state.APICalls >= 20) return;

    this.setState({
      APICalls: this.state.APICalls + 1,
    });

    if (refresh) {
      this.setState({
        location: "updating",
        locationLastUpdate: "never",
      });
    }

    axios.get("/api/location")
      .then((response) => {
        if (response.data) {
          const { location, last_update } = response.data;
          this.setState({
            location,
            locationLastUpdate: last_update,
          });
        } else {
          this.setState({
            location: "Unknown",
            locationLastUpdate: "never",
          });
        }
      })
      .catch(() => {
        this.setState({
          location: "Unknown",
          locationLastUpdate: "never",
        });
      });
  }

  render() {
    return (
      <div className={styles.projectsSection}>
        <div className={styles.projectsSectionHeaderSection}>
          <span>Updates</span>
        </div>
        <div className={styles.projects}>
          <div onClick={() => this.onClickReloadData(1)} title="Fetched from the phone's GPS cordinates" className={styles.projectsItem}>
            <div className={styles.projectsItemHeader}>
              <span className={styles.projectsItemHeaderLogo}>📍</span>
              <span className={styles.projectsItemHeaderTypo}>Last Known Location</span>
            </div>
            <div className={styles.projectsItemResultSection}>
              <span className={styles.projectsItemResult}>{this.state.location}</span>
              <span className={styles.projectsItemResultSmall}>
                Updated
                {" "}
                {this.state.locationLastUpdate}
              </span>
            </div>
          </div>
          <div onClick={() => this.onClickReloadData(2)} title="Fetched from Github's Public Activity" className={styles.projectsItem}>
            <div className={styles.projectsItemHeader}>
              <span className={styles.projectsItemHeaderLogo}>👨‍💻</span>
              <span className={styles.projectsItemHeaderTypo}>Latest Code Activity</span>
            </div>
            <div className={styles.projectsItemResultSection}>
              <span className={styles.projectsItemResult}>{this.state.githubCommitMessage}</span>
              <span className={styles.projectsItemResultSmall}>{this.state.githubRepo}</span>
            </div>
          </div>
          <div onClick={() => this.onClickReloadData(3)} className={styles.projectsItem}>
            <div className={styles.projectsItemHeader}>
              <span className={styles.projectsItemHeaderLogo}>🌐</span>
              <span className={styles.projectsItemHeaderTypo}>Public APIs</span>
            </div>
            <div className={styles.projectsItemResultSection}>
              <span className={styles.projectsItemResult}>{this.state.activeAPIs}</span>
              <span className={styles.projectsItemResultSmall}>Live and Serving Open Data</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
