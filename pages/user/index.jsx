import React, { useEffect, useState } from "react";

import Link from "next/link";
import verify from "../../utils/functions/verify";

import Loading from "../../components/loading/Loading";
import Error404 from "../404";

import styles from "../../styles/userpage.module.css";

const index = ({ setSiteTitle }) => {
  const [loggedIn, setLoggedIn] = useState(null);

  const checkLogin = async () => {
    const verifyUser = await verify();
    if (verifyUser) {
      setSiteTitle("User");
      return setLoggedIn(true);
    }
    return setLoggedIn(false);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  if (loggedIn === true) {
    return (
      <div className={styles.userpage}>
        <Link href="/user/messages">
          <a href="/user/messages">
            <div className={styles.userPageButton}>
              <span>Messages</span>
            </div>
          </a>
        </Link>
        <Link href="/user/analytics">
          <a href="/user/analytics">
            <div className={styles.userPageButton}>
              <span>Analytics</span>
            </div>
          </a>
        </Link>
      </div>
    );
  }

  if (loggedIn === false) {
    return <Error404 />;
  }

  return <Loading />;
};

export default index;
