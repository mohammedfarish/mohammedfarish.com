import axios from "axios";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { encryptedData } from "../utils/functions/encryption";

import styles from "../styles/privacypage.module.css";

const Markdown = dynamic(() => import("../components/markdown/Markdown"), {
  ssr: false,
});

function PrivacyPolicy({ setSiteTitle, token }) {
  const [hideTrackLine, setHideTrackLine] = useState(false);
  const [markdown, setMarkdown] = useState(null);

  const fetchUIDData = async (uid) => {
    const data = await axios.put("/api/analytics", { uid }, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((response) => response.data);
    return JSON.stringify(data, null, 4);
  };

  const fetchUSerData = async (input) => {
    const uid = localStorage.getItem("uid");
    let replaceText = "```\nno data found\n```";
    if (uid) {
      const data = await fetchUIDData(uid);
      if (data) replaceText = `\`\`\`\n${data}\n\`\`\``;
    }
    const text = input.replace("{{REPLACEWITHDATA}}", replaceText);
    return text;
  };

  const fetchMarkdown = async (mdFile) => {
    const response = await fetch(mdFile);
    let text = await response.text();
    text = await fetchUSerData(text);
    setMarkdown(text);
  };

  useEffect(() => {
    const uid = window.localStorage.getItem("uid");
    if (!uid) setHideTrackLine(true);
    setSiteTitle("Privacy Policy");
    fetchMarkdown("/privacy-policy.md");
    return () => {
      setSiteTitle(null);
    };
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

  if (!markdown) return <div hidden />;

  return (
    <div className="w-full text-justify">
      <Markdown text={markdown} />
      <div className={styles.privacyActionSection}>
        <div className={styles.privacyActionHeader}>
          <h1>Analytics Settings</h1>
        </div>
        <div hidden={!!hideTrackLine}>
          <span>
            If you want to opt-out of this,
            {" "}
            <span
              onClick={onClickDisableTracking}
              className={styles.privacyAction}
            >
              click here
            </span>
            .
          </span>
        </div>
        <div hidden={!hideTrackLine}>
          <span className={styles.privacyTrackFalse}>You are not being tracked. </span>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;

export async function getServerSideProps() {
  const internalKey = process.env.INTERNAL_KEY;
  return {
    props: {
      token: encryptedData(internalKey),
    },
  };
}
