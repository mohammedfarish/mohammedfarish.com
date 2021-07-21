import axios from "axios";
import React, { PureComponent } from "react";

import styles from "../../styles/statusupdate.module.css";

export default class StatusUpdates extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      status: null,
    };
  }

  componentDidMount() {
    axios.get("/api/statusupdate")
      .then((response) => {
        if (response.data) {
          this.setState({
            status: response.data,
          });
        }
      });
  }

  render() {
    const { status } = this.state;

    if (status) {
      return (
        <div className={styles.section}>
          <div>

            <span className={styles.sectionHeader}>Latest Update</span>
            <span style={{ color: "red" }}>*</span>
          </div>
          <div className={styles.update}>
            <span className={styles.content}>{status.content}</span>
            <span className={styles.date}>
              Updated
              {" "}
              {status.date}
            </span>
          </div>
          {/* <div className={styles.update}>
            <span className={styles.content}>{status.content}</span>
            <span className={styles.date}>{status.date}</span>
          </div> */}
          {/* <div className={styles.seeMoreButton}>
            <span className={styles.seeMoreButtonText}>Show more</span>
          </div> */}
        </div>
      );
    }

    return <div hidden />;
  }
}
