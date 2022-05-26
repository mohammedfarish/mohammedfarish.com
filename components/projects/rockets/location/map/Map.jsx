import React from "react";
import {
  MapContainer, TileLayer, Marker,
} from "react-leaflet";

import styles from "./map.module.css";

function Map({ data }) {
  return (
    <div className={styles.mapSection}>
      <MapContainer
        center={{ lat: data.latitute, lng: data.longitude }}
        zoom={4}
        minZoom={3}
        easeLinearity
        fadeAnimation
        doubleClickZoom
        className={styles.mapContainer}
      >
        <TileLayer
          url="https://tile.osm.ch/switzerland/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.amnuz.com/?utm=dubatravels" target="_blank">Mohammed Farish</a>'
        />
        <Marker
          position={{ lat: data.latitute, lng: data.longitude }}
        />
      </MapContainer>
    </div>
  );
}

export default Map;
