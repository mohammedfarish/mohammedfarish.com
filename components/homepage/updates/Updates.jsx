import axios from "axios";
import React, { Component } from "react";

import StatusUpdates from "./StatusUpdates";

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
      APICalls: 0,
    };
  }

  componentDidMount() {
    this.fetchGithubData();
    this.fetchLocation();
    this.fetchActiveAPIs();
    this.fetchLocation();
  }

  onClickReloadData(type) {
    if (type === 1) return this.fetchLocation(true);
    if (type === 2) return this.fetchGithubData(true);
    if (type === 3) return this.fetchActiveAPIs(true);

    return false;
  }

  fetchActiveAPIs(refresh) {
    const { APICalls } = this.state;

    if (APICalls >= 20) return;

    this.setState({
      APICalls: APICalls + 1,
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
          activeAPIs: "0 Servers",
        });
      });
  }

  fetchGithubData(refresh) {
    const { APICalls } = this.state;

    if (APICalls >= 20) return;

    this.setState({
      APICalls: APICalls + 1,
    });

    if (refresh) {
      this.setState({
        githubRepo: ["updating", "updating"],
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
            const parsedData = {
              repo: repo.name,
              message: payload.commits[0].message,
            };
            githubData.push(parsedData);
          }
        });

        const { repo, message } = githubData[0];

        const repoArray = repo.split("/");

        this.setState({
          githubRepo: repoArray,
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
    const { APICalls } = this.state;

    if (APICalls >= 20) return;

    this.setState({
      APICalls: APICalls + 1,
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
          const { location, last_update: lastUPdate } = response.data;
          this.setState({
            location,
            locationLastUpdate: lastUPdate,
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
    const {
      location, locationLastUpdate, githubCommitMessage,
      githubRepo, activeAPIs,
    } = this.state;

    return (
      <div className="mf-section">
        <div className="mf-section-header">
          <span>Updates</span>
        </div>
        <div className="flex items-center justify-evenly flex-wrap">
          <div onClick={() => this.onClickReloadData(1)} title="Fetched from the phone's GPS cordinates" className="xs:w-3/4 cursor-pointer mf-bevel drop-shadow-mf bg-mf-white w-44 h-44 p-1 m-4 select-none mf-btn-primary">
            <div className="text-base text-center flex flex-col justify-around h-1/2">
              <span className="text-xl h-5">📍</span>
              <span className="font-bold text-sm">Last Known Location</span>
            </div>
            <div className="flex flex-col items-center justify-evenly h-1/2">
              <span className="text-center w-full text-xs">{location}</span>
              <span className="text-center text-[8px] my-1 w-full">
                Updated
                {" "}
                {locationLastUpdate}
              </span>
            </div>
          </div>
          <div onClick={() => this.onClickReloadData(2)} title="Fetched from Github's Public Activity" className="xs:w-3/4 cursor-pointer mf-bevel drop-shadow-mf bg-mf-white w-44 h-44 p-1 m-4 select-none mf-btn-primary">
            <div className="text-base text-center flex flex-col justify-around h-1/2">
              <span className="text-xl h-5">👨‍💻</span>
              <span className="font-bold text-sm">Latest Code Activity</span>
            </div>
            <div className="flex flex-col items-center justify-evenly h-1/2">
              <span className="text-center w-full text-xs line-clamp-2">{githubCommitMessage}</span>
              <div className="flex flex-col my-1">
                <span className="text-center text-[8px] w-full line-clamp-1">{githubRepo[0]}</span>
                <span className="text-center text-[8px] w-full line-clamp-1">{githubRepo[1]}</span>
              </div>
            </div>
          </div>
          <div onClick={() => this.onClickReloadData(3)} className="xs:w-3/4 cursor-pointer mf-bevel drop-shadow-mf bg-mf-white w-44 h-44 p-1 m-4 select-none mf-btn-primary">
            <div className="text-base text-center flex flex-col justify-around h-1/2">
              <span className="text-xl h-5">🌐</span>
              <span className="font-bold text-sm">Public APIs</span>
            </div>
            <div className="flex flex-col items-center justify-evenly h-1/2">
              <span className="text-center w-full text-xs">{activeAPIs}</span>
              <span className="text-center text-[8px] my-1 w-full">Live and Serving Open Data</span>
            </div>
          </div>
        </div>
        <StatusUpdates />
      </div>
    );
  }
}
