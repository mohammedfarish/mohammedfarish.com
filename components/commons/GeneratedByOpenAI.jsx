import React from "react";
import Moment from "moment-timezone";

function GeneratedByOpenAI({ date, nextDate }) {
  return (
    <div
      className="flex items-center uppercase text-[10px] text-gray-400 fill-gray-400 -mt-2 mb-3 select-none"
      title={`Next Re-Generation ${Moment(nextDate).fromNow()}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-2 mr-2" viewBox="0 0 24 24">
        <path d="M13.25 7c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25.56-1.25 1.25-1.25 1.25.56 1.25 1.25zm10.75 5c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-2 0c0-5.514-4.486-10-10-10s-10 4.486-10 10 4.486 10 10 10 10-4.486 10-10zm-13-2v2h2v6h2v-8h-4z" />
      </svg>
      <span>
        Regenerated
        {" "}
        {Moment(date).fromNow()}
        {" "}
        by
        {" "}
        <a
          className="hover:underline"
          href="https://platform.openai.com/docs/models/gpt-4"
          target="_blank"
          rel="noreferrer"
        >
          OpenAI's GTP-4
        </a>
        .
      </span>
    </div>
  );
}

export default GeneratedByOpenAI;
