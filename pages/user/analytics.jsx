import React, { useEffect, useState } from "react";
import axios from "axios";

import Error404 from "../404";

import verifyUser from "../../utils/functions/verify";

import styles from "../../styles/analytics.module.css";

const analytics = ({ setSiteTitle }) => {
  const [parsedActivityData, setParsedActivityData] = useState([]);
  const [totalVisitsState, setTotalVisits] = useState(0);
  const [uniqueVisitorsCountState, setUniqueVisitorsCount] = useState(0);
  const [loggedin, setLoggedin] = useState(null);

  const fetchData = async () => {
    const formattedData = [];
    await axios.get("/api/analytics", {
      headers: {
        "x-auth-token": window.localStorage.getItem("user"),
      },
    })
      .then((response) => {
        const { success } = response.data;
        if (success === true) {
          const {
            totalVisits,
            uniqueVisitorsCount,
            activityDataArray,
          } = response.data;

          activityDataArray.forEach(async (data) => {
            const {
              userAgent,
              id,
              initialActivity,
              activityData,
              lastActivityFomatted,
              lastActivityUnix,
              visitCount,
            } = data;

            const ipData = await axios.get(`https://freegeoip.app/json/${activityData[0].ip}`)
              .then((res) => {
                const {
                  city,
                  region_name: regionName,
                  country_name: countryName,
                } = res.data;
                if (city && regionName) {
                  return `${city}, ${regionName}, ${countryName}`;
                }
                return countryName;
              }).catch(() => "Unknown Location");

            const parsedUserAgent = await axios.get("https://api.apicagent.com/", {
              params: {
                ua: userAgent,
              },
            }).then(((resp) => {
              const { browser_family: browserFamily } = resp.data;
              if (browserFamily) {
                const { device, os } = resp.data;
                const { brand, model, type } = device;
                const { name, platform, version } = os;
                if (brand !== "unknown") {
                  if (brand === "Apple") {
                    return `${brand} ${model} ${name} ${version} (${type})`;
                  }
                  return `${brand} ${model} ${name} (${type})`;
                }
                return `${platform} ${name} ${version} (${type})`;
              }

              const { category } = resp.data;
              if (category === "Search bot") {
                const { name, producer } = resp.data;
                const { name: producerName } = producer;
                return `${producerName} ${name}`;
              }
              return userAgent;
            })).catch(() => userAgent);

            const parsedData = {
              id,
              initialActivity,
              lastActivityFomatted,
              lastActivityUnix,
              visitCount,
              activityData,
              userAgent: parsedUserAgent,
              ipData,
            };

            formattedData.push(parsedData);
          });

          setTimeout(() => {
            formattedData.sort((a, b) => (
              // eslint-disable-next-line no-nested-ternary
              (a.lastActivityUnix < b.lastActivityUnix) ? 1
                : ((b.lastActivityUnix < a.lastActivityUnix) ? -1 : 0)
            ));
            setParsedActivityData(formattedData);
          }, 5000);

          setTotalVisits(totalVisits);
          setUniqueVisitorsCount(uniqueVisitorsCount);

          return true;
        }
        return false;
      })
      .catch(() => setLoggedin(false));
  };

  useEffect(async () => {
    setSiteTitle("Analytics");
    const verify = await verifyUser();
    if (verify) {
      setLoggedin(true);
      return fetchData();
    }
    return setLoggedin(false);
  }, []);

  if (loggedin === true) {
    return (
      <div className={styles.analyticsPage}>
        <div className={styles.analyticsMainNumbersSection}>
          <div className={styles.analyticsMainNumbers}>
            <span className={styles.analyticsMainNumbersHeader}>Total Visits</span>
            <span className={styles.analyticsMainNumbersCount}>{totalVisitsState}</span>
          </div>
          <div className={styles.analyticsMainNumbers}>
            <span className={styles.analyticsMainNumbersHeader}>Unique Visitors</span>
            <span className={styles.analyticsMainNumbersCount}>{uniqueVisitorsCountState}</span>
          </div>
        </div>
        <div className={styles.analyticsResultsSection}>
          {parsedActivityData.map((data) => (
            <div className={styles.analyticsItem} key={data.id}>
              <div className={styles.analyticsItemItems}>
                <span className={styles.analyticsItemItemsHeader}>Device ID</span>
                <span className={styles.analyticsItemItemsContent}>{data.id}</span>
              </div>
              <div className={styles.analyticsItemItems}>
                <span className={styles.analyticsItemItemsHeader}>User Agent</span>
                <span className={styles.analyticsItemItemsContent}>{data.userAgent}</span>
              </div>
              <div className={styles.analyticsItemItems}>
                <span className={styles.analyticsItemItemsHeader}>Activity Count</span>
                <span className={styles.analyticsItemItemsContent}>
                  {data.activityData.length}
                </span>
              </div>
              <div className={styles.analyticsItemItems}>
                <span className={styles.analyticsItemItemsHeader}>Visit Count</span>
                <span className={styles.analyticsItemItemsContent}>{data.visitCount}</span>
              </div>
              <div className={styles.analyticsItemItems}>
                <span className={styles.analyticsItemItemsHeader}>Last Known IP</span>
                <span
                  className={styles.analyticsItemItemsContent}
                >
                  {data.activityData[0].ip}
                  {" "}
                  (
                  {data.ipData}
                  )
                </span>
              </div>
              <span className={styles.analyticsItemItemsTime}>{`Last seen ${data.lastActivityFomatted}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (loggedin === null) {
    return <div className={styles.analyticsPage} />;
  }

  return <Error404 />;
};

export default analytics;
