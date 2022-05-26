import React from "react";
import isDev from "isdev";

import Error404 from "../404/index";

const index = () => {
  if (!isDev) return <Error404 />;

  return (
    <div>
      <span>books page</span>
    </div>
  );
};

export default index;
