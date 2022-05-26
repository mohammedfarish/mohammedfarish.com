/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "moment-timezone";
import accounting from "accounting";

import styles from "./next launch.module.css";
// import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";

function NextLaunch({ data }) {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [terminalCountDown, setTerminalCountDown] = useState("");

  const fetchImage = async () => {
    const fetchedImage = await axios.get(`/api/image/?q=${data.provider.name} new logo`)
      .then((response) => response.data);

    setImage(fetchedImage);
  };

  const updateTerminalCountDown = () => {
    let launchDate = data.win_open;
    if (!launchDate) return;

    launchDate = Moment(data.win_open).format();
    const timeNow = Moment();

    const duration = Moment.duration(timeNow.diff(launchDate));

    const hours = duration.asHours();
    const minutes = duration.minutes() * -1;
    const seconds = duration.seconds() * -1;

    const difference = `T ${accounting.formatNumber(hours)}:${minutes}:${seconds}`;

    setTerminalCountDown(difference);
  };

  useEffect(() => {
    setImage(null);
    fetchImage();

    const locationArray = [];

    const { name, state, country } = data.pad.location;
    if (name) { locationArray.push(name); }
    if (state) { locationArray.push(state); }
    if (country) { locationArray.push(country); }

    setLocation(locationArray.join(", "));

    updateTerminalCountDown();
    const terminalCountDownInterval = setInterval(() => {
      updateTerminalCountDown();
    }, 500);

    return () => {
      clearInterval(terminalCountDownInterval);
    };
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        {data.win_open ? (
          <span>
            {terminalCountDown}
          </span>
        ) : (
          <span>
            Upcoming Launch
          </span>
        )}
      </div>
      <div className={styles.infoSection}>
        <div className={styles.missionNameSection}>
          <label className={styles.infoLabel}>Upcoming Mission</label>
          {/* <span>{data.name}</span> */}
          <a href={`/projects/rockets/missions/${data.id}`}>{data.name}</a>
        </div>
        <div className={styles.rocketInfoSection}>
          <div className={styles.rocketInfoVehicleSection}>
            <label className={styles.infoLabel}>Launch Vehicle</label>
            <span className={styles.rocketVehicleName}>{data.vehicle.name}</span>
          </div>
          <div className={styles.rocketInfoProviderSection}>
            <label className={styles.infoLabel}>Launch Provider</label>
            <span className={styles.rocketProviderName}>{data.provider.name}</span>
          </div>
          <div className={styles.rocketInfoProviderSection}>
            <label className={styles.infoLabel}>Launch Pad</label>
            <span className={styles.rocketProviderName}>{data.pad.name}</span>
          </div>
          <div className={styles.rocketInfoProviderSection}>
            <label className={styles.infoLabel}>Location</label>
            <a href={`/projects/rockets/location/${data.pad.location.id}`} className={styles.rocketProviderName}>{location}</a>

          </div>
        </div>
        <div className={styles.rocketInfoLogoSection}>
          {image ? (
            <img className={styles.logo} src={image} alt="logo" />
          ) : (
            <img className={styles.logo} src="/assets/seoimage.jpg" alt="logo" />
          )}
          <div className={styles.launchWindowSection}>
            <label>Launch Window</label>
            {data.win_open ? (
              <>
                <span className={styles.date}>{Moment(data.win_open).format("DD MMM")}</span>
                <span className={styles.time}>{Moment(data.win_open).format("hh:mm A")}</span>
              </>
            ) : (
              <>
                <span className={styles.date}>{data.date_str}</span>
                <label>(Estimated)</label>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NextLaunch;
