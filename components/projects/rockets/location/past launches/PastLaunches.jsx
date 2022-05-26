import React, { useState } from "react";
import Moment from "moment-timezone";
import axios from "axios";

import styles from "./past launches.module.css";

function PastLaunches({ data, totalLaunches, id }) {
  const [launchDataArray, setLaunchDataArray] = useState([...data]);
  const [page, setPage] = useState(1);
  const [disableLoadMore, setDisableLoadMore] = useState(false);

  const fetchMore = async () => {
    if (disableLoadMore) return;
    const maxPages = Math.ceil((totalLaunches + 1) / 25);
    if (maxPages <= page) return;
    setDisableLoadMore(true);
    setPage((i) => (i + 1));

    const newData = await axios.get("/api/projects/rockets/launches", {
      params: {
        id,
        page: maxPages - page,
      },
    })
      .then((response) => response.data)
      .catch(() => []);

    setLaunchDataArray((items) => [...items, ...newData]);
    setDisableLoadMore(false);
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <span>Past Launches</span>
      </div>
      <div className={styles.listSection}>
        {launchDataArray.map((item, i) => (
          <a href={`/projects/rockets/launches/${item.id}`} className={styles.listItem} key={item.id}>
            <div className={styles.listItemCount}>
              <span>{ (totalLaunches + 1) - (i + 1)}</span>
            </div>
            <div className={styles.listItemName}>
              <label>T 0</label>
              <span className={styles.daysAgo}>{Moment(item.t0 || item.win_open).fromNow()}</span>
              <span>{Moment(item.t0 || item.win_open).format("DD MMM YYYY")}</span>
              <span>{Moment(item.t0 || item.win_open).format("HH:mm")}</span>
            </div>
            <div className={styles.listItemName}>
              <label>Mission</label>
              <span>{item.name || "OK"}</span>
            </div>
            <div className={styles.listItemName}>
              <label>Vehicle</label>
              <span>{item.vehicle.name || "OK"}</span>
            </div>
            <div className={styles.listItemName}>
              <label>Pad</label>
              <span>{item.pad.name || "OK"}</span>
            </div>
            <div className={styles.listItemName}>
              <label>Launch Provider</label>
              <span>{item.provider.name || "OK"}</span>
            </div>
            <div className={styles.iconSecion}>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" /></svg>
            </div>
          </a>
        ))}
      </div>
      <div
        onClick={fetchMore}
        className={disableLoadMore || page === Math.ceil((totalLaunches + 1) / 25)
          ? styles.loadMoreSectionPressed
          : styles.loadMoreSection}
      >
        <span>LOAD MORE</span>
      </div>
    </div>
  );
}

export default PastLaunches;
