import React, { useEffect } from "react";

import LatestArticles from "../components/homepage/latest articles/LatestArticles";
import GetInTouch from "../components/homepage/contact/GetInTouch";
import Updates from "../components/homepage/updates/Updates";
import Hero from "../components/homepage/hero/Hero";

function Home({ setSiteTitle }) {
  useEffect(() => {
    setSiteTitle(null);
  }, []);
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <Updates />
      <LatestArticles />
      <GetInTouch />
    </div>
  );
}

export default Home;
