import React from "react";
import axios from "axios";
// import Image from "next/image";

import styles from "./rockets.module.css";

import NextLaunch from "../../../components/projects/rockets/next launch/NextLaunch";
import LaunchCard from "../../../components/projects/rockets/launch card/LaunchCard";

import CustomeHead from "../../../components/head/Head";
import Error500 from "../../500";

const index = ({ error, launches }) => {
  if (error || !launches) return <Error500 error={error} />;

  return (
    <>
      <CustomeHead
        title="Rocket Launches"
      />
      <div className={styles.page}>
        <NextLaunch data={launches[0]} />
        <div className={styles.separator}>
          <span>Launches in Schedule</span>
        </div>
        {launches.filter((value) => value.id !== launches[0].id).map((item, i) => (
          <LaunchCard key={item.id} data={item} i={i} />
        ))}
      </div>
    </>
  );
};
export default index;

export async function getServerSideProps(ctx) {
  const launches = await axios.get(`${process.env.R_API_URI}/json/launches/`, {
    headers: {
      Authorization: `Bearer ${process.env.R_API_TOKEN}`,
    },
  })
    .then((response) => response.data.result || null)
    .catch(async (err) => ({
      error: err.isAxiosError,
      errorData: {
        url: err.response.config.url,
        status: err.response.status,
        message: err.message,
      },
    }));

  if (launches && launches.error) {
    const { resolvedUrl } = ctx;
    return {
      props: {
        error: {
          resolvedUrl,
          errorData: launches,
        },
      },
    };
  }

  return {
    props: {
      launches,
    },
  };
}
