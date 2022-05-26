import React from "react";
import dynamic from "next/dynamic";
import Moment from "moment-timezone";
import axios from "axios";

import styles from "./location.module.css";

import LocationInfo from "../../../../components/projects/rockets/location/location Info/LocationInfo";
import PastLaunches from "../../../../components/projects/rockets/location/past launches/PastLaunches";

import Error500 from "../../../500/index";
import Error404 from "../../../404";
import CustomHead from "../../../../components/head/Head";

const Map = dynamic(() => import("../../../../components/projects/rockets/location/map/Map"), { ssr: false });

const index = ({
  location, pastLaunches,
  totalLaunches, pageCount, id, error,
}) => {
  if (error) {
    return (
      <Error500
        error={error}
      />
    );
  }

  if (!location) {
    return (
      <Error404 />
    );
  }

  return (
    <>
      <CustomHead
        title={`${location.name} | Rockets`}
      />
      <div className={styles.page}>
        <Map
          data={location}
          latitute={location.latitute}
          longitude={location.longitude}
        />
        <LocationInfo data={location} />
        <PastLaunches
          id={id}
          data={pastLaunches}
          totalLaunches={totalLaunches}
          pageCount={pageCount}
        />
      </div>
    </>

  );
};
export default index;

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  const location = await axios.get(`${process.env.R_API_URI}/json/locations`, {
    headers: {
      Authorization: `Bearer ${process.env.R_API_TOKEN}`,
    },
    params: {
      id,
    },
  })
    .then((response) => response.data.result[0] || null)
    .catch((err) => ({
      error: err.isAxiosError,
      errorData: {
        url: err.response.config.url,
        status: err.response.status,
        message: err.message,
      },
    }));

  if (!location) {
    return {
      props: {
        location: null,
      },
    };
  }
  const lastPage = await axios.get(`${process.env.R_API_URI}/json/launches/`, {
    headers: {
      Authorization: `Bearer ${process.env.R_API_TOKEN}`,
    },
    params: {
      before_date: Moment().tz("Asia/Dubai").format("YYYY-MM-DD"),
      location_id: id,
    },
  })
    .then((response) => response.data)
    .catch((err) => ({
      error: err.isAxiosError,
      errorData: {
        url: err.response.config.url,
        status: err.response.status,
        message: err.message,
      },
    }));

  const pastLaunches = await axios.get(`${process.env.R_API_URI}/json/launches/`, {
    headers: {
      Authorization: `Bearer ${process.env.R_API_TOKEN}`,
    },
    params: {
      before_date: Moment().tz("Asia/Dubai").format("YYYY-MM-DD"),
      location_id: id,
      page: lastPage.last_page,
    },
  })
    .then((response) => response.data.result.reverse())
    .catch((err) => ({
      error: err.isAxiosError,
      errorData: {
        url: err.response.config.url,
        status: err.response.status,
        message: err.message,
      },
    }));

  if (location || lastPage || pastLaunches) {
    const { resolvedUrl } = ctx;
    if (location.error) {
      return {
        props: {
          error: {
            resolvedUrl,
            errorData: location,
          },
        },
      };
    }
    if (lastPage.error) {
      return {
        props: {
          error: {
            resolvedUrl,
            errorData: lastPage,
          },
        },
      };
    }
    if (pastLaunches.error) {
      return {
        props: {
          error: {
            resolvedUrl,
            errorData: pastLaunches,
          },
        },
      };
    }
  }

  return {
    props: {
      id,
      location,
      pastLaunches,
      pageCount: lastPage.last_page,
      totalLaunches: lastPage.total,
    },
  };
}
