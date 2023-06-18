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

function Hero({ shortAbouMe }) {
  const router = useRouter();
  // const chanceObj = new Chance();

  // const calculateAge = () => {
  //   const birthDate = Moment("1997-06-07", "YYYY-MM-DD");
  //   const todayDate = Moment().tz("Asia/Dubai");
  //   const years = todayDate.diff(birthDate, "years");
  //   return years;
  // };

  // const aboutMe = [
  //   `I am a ${calculateAge()}-year old self-taught software and fullstack web developer, and I'm also one of the founders of [Amnuz Technologies](https://www.amnuz.com?utm=mohammedfarish.com-hero), a company that's deeply focused on building solutions that simplifies business workflows.`,
  //   "As a self-taught software and full-stack web developer, I have a strong foundation in developing and deploying innovative solutions for businesses. I am also a co-founder of [Amnuz Technologies](https://www.amnuz.com?utm=mohammedfarish.com-hero), where we specialize in creating tools that streamline workflows and improve efficiency.",
  //   // `I am a ${age}-year old self-made software engineer
  //   // with a passion for building things that simplifies
  //   // business workflows. I've been highly passionate about`,

  //   // `A ${age}-year old.`,
  // ];

  return (
    <div className="mf-section">
      <div className="w-full min-h-[50vh] flex py-[2%] xs:flex-col xs:mb-20">
        <div className="prose-p:text-sm text-justify px-[2%] w-1/2 flex flex-col justify-center xs:px-0 xs:w-full xs:mb-20">
          <h1 className="font-bold text-2xl mb-2">I'm Mohammed Farish.</h1>
          <Markdown text={shortAbouMe.text} />
          <GeneratedByOpenAI date={shortAbouMe.generatedAt} nextDate={shortAbouMe.nextGeneration} />

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
