/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from "axios";
import React, { useEffect, useState } from "react";

import styles from "./card.module.css";

function LaunchCard({ data, i }) {
  const [logoImage, setLogoImage] = useState(null);

  const fetchlogoImage = async () => {
    const image = await axios.get(`/api/image?q=${data.provider.name} new logo`)
      .then((response) => response.data);
    setLogoImage(image);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchlogoImage();
    }, 100 * i);
  }, []);

  return (
    <a href={`/projects/rockets/launches/${data.id}`} className={styles.card}>
      <div className={styles.countSecion}>
        <span>{i + 2}</span>
      </div>
      <div className={styles.logoImageSection}>
        {logoImage ? (
          <img className={styles.logoImage} src={logoImage} alt={`${data.provider.name} logo`} />
        ) : (
          <img className={styles.logoImage} src="/assets/seoimage.jpg" alt={`${data.provider.name} logo`} />
        )}
      </div>
      <div className={styles.missionNameSection}>
        <label>Mission</label>
        <span className={styles.missionName}>{data.name}</span>
        <span className={styles.vehicleName}>{data.vehicle.name}</span>
        <span className={styles.providerName}>{data.provider.name}</span>
      </div>
      <div className={styles.missionNameSection}>
        <label>Location</label>
        <span className={styles.missionName}>{data.pad.location.name}</span>
        <span className={styles.vehicleName}>{data.pad.location.statename}</span>
        <span className={styles.providerName}>{data.pad.location.country}</span>
      </div>
      <div className={styles.missionNameSection}>
        <span className={styles.missionName}>{data.date_str}</span>
      </div>
    </a>
  );
}

export default LaunchCard;
