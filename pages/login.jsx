import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import verify from "../utils/functions/verify";
import Loading from "../components/loading/Loading";

import styles from "../styles/login.module.css";

const login = ({ setSiteTitle }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disableFields, setDisableFields] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [svgFill, setSVGFill] = useState("#363636");

  const Router = useRouter();

  useEffect(async () => {
    setSiteTitle("Login");
    const LoginStatus = await verify();
    if (LoginStatus) return Router.push("/user");
    setLoggedIn(false);

    return () => {
      setSiteTitle(null);
    };
  }, []);

  const onChangeUsername = (e) => {
    setUsername(e.target.value.toLowerCase());
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setDisableFields(true);

    if (!password || !username) return setDisableFields(false);

    setSVGFill("#edaa18");
    setErrorMessage("");

    const data = {
      usernameOrEmail: username,
      password,
      uid: window.localStorage.getItem("uid"),
    };

    const notrack = window.localStorage.getItem("no-track");
    if (!notrack) {
      const analyticsData = {
        uid: window.localStorage.getItem("uid"),
        data: {
          type: "loginAttempt",
          username,
        },
      };
      axios.post("/api/analytics", analyticsData);
    }

    return axios.post("/api/user/signin", data)
      .then((response) => {
        const { success } = response.data;

        if (success === true) {
          const { token } = response.data;
          setSVGFill("yellowgreen");
          setErrorMessage("");
          window.localStorage.setItem("user", token);
          return setTimeout(() => {
            Router.reload();
          }, 1000);
        }

        const { reason } = response.data;

        setErrorMessage(reason);
        setSVGFill("tomato");
        setPassword("");
        return setDisableFields(false);
      })
      .catch(() => {
        setErrorMessage("Internal Server Error");
        setSVGFill("tomato");
        setPassword("");
        return setDisableFields(false);
      });
  };

  const changeImageColor = (field) => {
    if (field === "username") {
      setSVGFill("grey");
    } else if (field === "password") {
      setSVGFill("yellowgreen");
    } else {
      setSVGFill("black");
    }
  };

  if (loggedIn === false) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginPageHeader}>
          <svg style={{ fill: svgFill }} className={styles.loginPageHeaderUserSymbol} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 2c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6zm0-2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm-5.405 16.4l-1.472 1.6h-3.123v2h-2v2h-2v-2.179l5.903-5.976c-.404-.559-.754-1.158-1.038-1.795l-6.865 6.95v5h6v-2h2v-2h2l2.451-2.663c-.655-.249-1.276-.562-1.856-.937zm7.405-11.4c.551 0 1 .449 1 1s-.449 1-1 1-1-.449-1-1 .449-1 1-1zm0-1c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z" /></svg>
        </div>
        <div className={styles.errorMessage}>
          <span>{errorMessage}</span>
        </div>
        <div className={styles.loginPageFormSection}>
          <form onSubmit={onSubmit} className={styles.loginPageForm}>
            <input
              type="text"
              required
              disabled={disableFields}
                    // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={username}
              onChange={onChangeUsername}
              placeholder="Username or Email"
              className={styles.loginFormInput}
              onFocus={() => changeImageColor("username")}
            />
            <input
              type="password"
              required
              disabled={disableFields}
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              className={styles.loginFormInput}
              onFocus={() => changeImageColor("password")}
            />
            <input
              type="submit"
              required
              disabled={disableFields}
              value="login"
              className={styles.loginFormSubmitButton}
            />
          </form>
        </div>
      </div>
    );
  }
  return <Loading />;
};

export default login;
