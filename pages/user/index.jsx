import React, { useEffect } from "react";
import Router from "next/router";

import verify from "../../utils/functions/verify";

import Loading from "../../components/loading/Loading";

const index = () => {
  const checkLogin = async () => {
    const verifyUser = await verify();
    if (!verifyUser) return Router.push("/login");
    return Router.push("/profile");
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return <Loading />;
};

export default index;
