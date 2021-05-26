import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import "../styles/globals.css";
import "../styles/fonts.css";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import isDev from "../utils/middlewares/isDev";
import CustomHead from "../components/head/Head";

function MyApp({ Component, pageProps }) {
  const [globalState, setGlobalState] = useState({});
  const [loggedIn, setLoggedIn] = useState(null);
  const [siteTitle, setSiteTitle] = useState("");

  const router = useRouter();

  const analytics = () => {
    const sessionUID = window.sessionStorage.getItem("uid");
    if (sessionUID) return;

    const data = {
      uid: window.localStorage.getItem("uid") || null,
      userAgent: window.navigator.userAgent,
      data: {
        type: "visit",
        page: router.asPath,
      },
    };

    axios.post("/api/analytics", data)
      .then((response) => {
        const { uid } = response.data;
        if (uid) {
          window.localStorage.setItem("uid", uid);
        }
        window.sessionStorage.setItem("uid", "9655412898773276531324564");
      });
  };

  useEffect(() => {
    if (isDev()) return;

    analytics();

    if (document.addEventListener) {
      document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      }, false);
      document.addEventListener("copy", (e) => {
        e.preventDefault();
      });
    } else {
      document.attachEvent("oncontextmenu", () => {
        window.event.returnValue = false;
      });
      document.attachEvent("copy", () => {
        window.event.returnValue = false;
      });
    }
  }, []);

  useEffect(() => {
    if (loggedIn === null) return;
    setLoggedIn(null);
    router.reload();
  }, [loggedIn]);

  useEffect(() => {
    const uid = window.localStorage.getItem("uid");
    const sessionUID = window.sessionStorage.getItem("uid");
    if (!uid) return;
    if (!sessionUID) return;

    if (isDev()) return;

    const page = router.asPath;

    const data = {
      uid: window.localStorage.getItem("uid"),
      data: {
        type: "browse",
        page,
      },
    };

    axios.post("/api/analytics", data);
  }, [router.asPath]);

  return (
    <div>
      <CustomHead title={siteTitle} />
      <Header setLoggedIn={setLoggedIn} current={router.pathname} />
      <div className="pages">
        <Component
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...pageProps}
          setSiteTitle={setSiteTitle}
          globalState={globalState}
          setGlobalState={setGlobalState}
        />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
