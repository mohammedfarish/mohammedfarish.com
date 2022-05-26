import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import { encryptedData } from "../utils/functions/encryption";

import CustomHead from "../components/head/Head";

const Markdown = dynamic(() => import("../components/markdown/Markdown"), {
  ssr: false,
});

export default function PrivacyPolicy({ token }) {
  const [hideTrackLine, setHideTrackLine] = useState(false);
  const loadingMessage = "#### <center>Loading the Latest Privacy Policy ...</center>";
  const [markdown, setMarkdown] = useState(loadingMessage);
  const fetchUIDData = async (uid) => {
    const data = await axios.put("/api/analytics", { uid }, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((response) => response.data)
      .catch(() => null);
    if (data) { return JSON.stringify(data, null, 4); }
    return null;
  };

  const fetchUserData = async (input) => {
    const uid = localStorage.getItem("uid");
    let replaceText = "```bash\nError: 'User data not found'\n```";
    let data;
    if (uid) {
      data = await fetchUIDData(uid);
      if (data) replaceText = `\`\`\`json:userData.json\n${data}\n\`\`\``;
    }

    const text = input.replace("{{REPLACEWITHDATA}}", replaceText);
    return text;
  };

  const fetchMarkdown = async (mdFile) => {
    const response = await fetch(mdFile);
    let text = await response.text();
    text = await fetchUserData(text);
    setMarkdown(text);
  };

  useEffect(() => {
    fetchMarkdown("/privacy-policy.md");
    const uid = window.localStorage.getItem("uid");
    if (!uid) setHideTrackLine(true);
  }, []);

  const onClickDisableTracking = () => {
    const uid = window.localStorage.getItem("uid");
    if (!uid) return;
    window.localStorage.removeItem("uid");
    window.localStorage.setItem("gdpr-acknowledged", true);
    window.localStorage.setItem("no-track", true);
    setHideTrackLine(true);
    axios.delete("/api/analytics", {
      headers: {
        "x-auth-token": uid,
      },
    }).then(() => window.location.reload())
      .catch(() => window.location.reload());
  };

  return (
    <>
      <CustomHead
        title="Privacy Policy"
        content="A short note on how I collect and use your data."
      />
      <div className="w-full text-justify prose-pre:max-h-[50vh] prose-pre:overflow-y-scroll">
        <Markdown text={markdown} />
        <div className="border-0 border-t-2 border-mf-black mt-12 py-6 border-solid">
          <div className="underline mb-7 font-bold">
            <h1>Analytics Settings</h1>
          </div>
          {markdown !== loadingMessage ? (
            <>
              <div hidden={!!hideTrackLine}>
                <span>
                  If you want to opt-out of this,
                  {" "}
                  <span
                    onClick={onClickDisableTracking}
                    className="font-black select-none cursor-pointer underline"
                  >
                    click here
                  </span>
                  .
                </span>
              </div>
              <div hidden={!hideTrackLine}>
                <span className="bg-[lightgreen] py-1 px-2 select-none">You are not being tracked. </span>
              </div>
            </>
          ) : (
            <div hidden />
          )}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { token: encryptedData(process.env.INTERNAL_KEY) },
    revalidate: 3600,
  };
}
