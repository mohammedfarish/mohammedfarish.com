import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Loading from "../components/loading/Loading";
import logOutUser from "../utils/functions/logout";

const index = ({ setSiteTitle }) => {
  const Router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  const logoutUser = async () => {
    const user = window.localStorage.getItem("user");
    if (user) {
      setLoggedIn(true);
      try {
        await logOutUser();
        window.localStorage.removeItem("user");
        return Router.reload();
      } catch (error) {
        window.localStorage.removeItem("user");
        return Router.reload();
      }
    }
    setLoggedIn(false);
    return Router.push("/");
  };

  useEffect(() => {
    setSiteTitle(null);
    logoutUser();
  }, []);

  if (loggedIn) {
    return <Loading message="Logging out" />;
  }

  return <Loading />;
};

export default index;
