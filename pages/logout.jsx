import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Loading from "../components/loading/Loading";
import logOutUser from "../utils/functions/logout";

const index = () => {
  const Router = useRouter();

  const logoutUser = async () => {
    const user = window.localStorage.getItem("user");
    if (user) {
      try {
        await logOutUser();
        window.localStorage.removeItem("user");
        return Router.reload();
      } catch (error) {
        window.localStorage.removeItem("user");
        return Router.reload();
      }
    }
    window.localStorage.removeItem("user");
    return Router.push("/");
  };

  useEffect(() => {
    logoutUser();
  }, []);

  return <Loading message="Logging out" />;
};

export default index;
