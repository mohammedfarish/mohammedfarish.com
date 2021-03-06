import React from "react";

import styles from "./section.module.css";

function LocationInfo({ data }) {
  return (
    <div className={styles.section}>
      <div className={styles.locationName}>
        <span>{data.name}</span>
      </div>
      <div className={styles.locationInfoSection}>
        {data.state ? (
          <div className={styles.locationInfoItem}>
            <label>State</label>
            <span>{data.state.name}</span>
          </div>
        ) : (
          <div hidden />
        )}
        <div className={styles.locationInfoItem}>
          <label>Country</label>
          <span>{data.country.name}</span>
        </div>
      </div>
      <div className={styles.locationInfoPadSection}>
        <div className={styles.locationInfoPadSectionHeader}>
          <span>{`${data.pads.length} Launch Pads`}</span>
        </div>
        <div className={styles.locationInfoPadItemsSection}>
          {data.pads.map((item) => (
            <div key={item.id} className={styles.locationInfoPadItem}>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.locationInfoPadItemIcon} viewBox="0 0 24 24"><path d="M5.344 19.442l-1.186 1.628c-2.305-1.995-3.842-4.85-4.107-8.07h2c.255 2.553 1.48 4.819 3.293 6.442zm16.605-6.442c-.256 2.56-1.487 4.831-3.308 6.455l1.183 1.631c2.315-1.997 3.858-4.858 4.125-8.086h-2zm-19.898-2c.256-2.561 1.487-4.832 3.309-6.456l-1.183-1.631c-2.317 1.996-3.86 4.858-4.126 8.087h2zm4.927-7.633c1.477-.864 3.19-1.367 5.022-1.367 1.839 0 3.558.507 5.039 1.377l1.183-1.624c-1.817-1.105-3.941-1.753-6.222-1.753-2.272 0-4.39.644-6.201 1.741l1.179 1.626zm12.863-.438l-1.186 1.628c1.813 1.624 3.039 3.889 3.294 6.443h2c-.265-3.221-1.802-6.076-4.108-8.071zm-2.817 17.703c-1.478.864-3.192 1.368-5.024 1.368-1.84 0-3.56-.508-5.042-1.378l-1.183 1.624c1.818 1.106 3.943 1.754 6.225 1.754 2.273 0 4.392-.644 6.203-1.742l-1.179-1.626z" /></svg>
              <span className={styles.locationInfoPadItemName} key={item.id}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LocationInfo;
