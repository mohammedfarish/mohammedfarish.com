import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Moment from "moment-timezone";

import CustomHead from "../../components/head/Head";

const Markdown = dynamic(() => import("../../components/markdown/Markdown"), { ssr: false });

const index = () => {
  const [markdown, setMarkdown] = useState("### <center>Loading</center>");

  const calculateAge = () => {
    const birthDate = Moment("1997-06-07");
    const todayDate = Moment().tz("Asia/Dubai");
    return todayDate.diff(birthDate, "years");
  };

  const fetchMarkdown = async () => {
    const response = await fetch("./aboutme.md");
    let text = await response.text();
    text = text.replace("{{AGE}}", calculateAge());
    return text;
  };

  const fetchData = async () => {
    const data = await fetchMarkdown();
    setMarkdown(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CustomHead
        title="About Me"
      />
      {/* w-2/4 sm:w-4/5 m */}
      <div className="xs:w-full w-1/2 text-justify hover:prose-a:text-mf-black">
        <Markdown text={markdown} />
      </div>
    </>
  );
};

export default index;
