import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
// import Chance from "chance";
// import Moment from "moment-timezone";

import Terminal from "./terminal/Terminal";
import GeneratedByOpenAI from "../../commons/GeneratedByOpenAI";

const Markdown = dynamic(() => import("../../markdown/Markdown"), {
  ssr: false,
});

function Hero({ shortAboutMe }) {
  const router = useRouter();

  return (
    <div className="mf-section">
      <div className="w-full min-h-[50vh] flex py-[2%] xs:flex-col xs:mb-20">
        <div className="prose-p:text-sm text-justify px-[2%] w-1/2 flex flex-col justify-center xs:px-0 xs:w-full xs:mb-20">
          <h1 className="font-bold text-2xl mb-2">I'm Mohammed Farish.</h1>
          <Markdown text={shortAboutMe.text} />
          {shortAboutMe.text && (
            <GeneratedByOpenAI
              date={shortAboutMe.generatedAt}
              nextDate={shortAboutMe.nextGeneration}
            />
          )}

          <Link href="/me">
            <a href="/me" className="w-40 inline-flex items-center p-0 text-mf-black active:text-mf-black ">
              <span className="text-sm font-medium">
                More about me
              </span>
              <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </Link>

        </div>
        <div className="mx-[2%] min-w-[50%] max-h-[50vh] flex justify-center flex-col ">
          <Terminal router={router} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
