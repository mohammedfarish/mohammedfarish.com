import React from "react";
import dynamic from "next/dynamic";
import Moment from "moment-timezone";
import isdev from "isdev";

import CustomHead from "../../components/head/Head";
import GeneratedByOpenAI from "../../components/commons/GeneratedByOpenAI";
import { openaiCompletions } from "../../utils/functions/openai";
import AboutMe from "../AboutMe.json";

const Markdown = dynamic(() => import("../../components/markdown/Markdown"), { ssr: false });

const calculateAge = () => {
  const birthDate = Moment("1997-06-07");
  return Moment().diff(birthDate, "years");
};

const index = ({ aboutMe }) => (
  <>
    <CustomHead
      title="About Me"
      content="Get to know more about me."
    />
    <div className="xs:w-full w-1/2 text-justify hover:prose-a:text-mf-black">
      <Markdown text={aboutMe.text} />
      <GeneratedByOpenAI date={aboutMe.generatedAt} nextDate={aboutMe.nextGeneration} />
    </div>
  </>
);

export default index;

export async function getStaticProps() {
  let days = 7;
  const formattedAboutMeObj = JSON.stringify({
    age: calculateAge(),
    ...AboutMe,
  });

  const prompt = `Write a creative, exciting and fun "about me" with the informations provided below. 3 or 4 paragraphs long. in markdown format. Hyperlinks. Filter out unneccessary information.
  
  ${formattedAboutMeObj}`;

  let aboutMeText = `# About Mohammed Farish

I'm a 25 year old Software and full-stack web developer from Abu Dhabi, UAE. I have a Mechanical Engineering degree from RR Institute of Technology, Bangalore, India and have previously studied High School in Apex Public School, Kozhikode, Kerala, India and Indian Islahi Islamic School, Abu Dhabi, UAE.

My professional experience includes co-founding and working as Head Engineer at [Amnuz Technologies](https://www.amnuz.com), a company that builds and manage tools that simplify business workflows. My skillset includes HTML, CSS, JavaScript, React, UI/UX Design, Adobe Creative Suite, Visual Studio Code, Figma and Slack.

I have worked on several projects such as [DEF Fashion](https://def-fashion.com), an e-commerce website, and [GHI Photography](https://ghi-photography.com), a portfolio website. I have received testimonials from clients such as Jane Smith, who said that my work "exceeded her expectations" and that I am "an incredibly talented developer and a pleasure to work with".

My mission is to create visually stunning, highly functional, and user-friendly websites that help businesses grow and connect with their audiences.

If you would like to learn more about me, you can connect with me through [email](john.doe@example.com), [Twitter](https://twitter.com/johndoe) or [LinkedIn](https://linkedin.com/in/johndoe). You can also explore my [blog](https://example.com/blog) and [subscribe](https://example.com/subscribe) to my newsletter.

Thank you for taking the time to learn more about me. I look forward to the opportunity to collaborate and create something amazing together!`;

  if (!isdev) {
    aboutMeText = await openaiCompletions({
      prompt,
      maxTokens: 1200,
    })
      .catch(() => {
        days = 1;
        return aboutMeText;
      });
  }

  return {
    props: {
      aboutMe: {
        text: aboutMeText,
        generatedAt: Moment().format(),
        nextGeneration: Moment().add(days, "day").format(),
      },
    },
    revalidate: 60 * 60 * 24 * days,
  };
}
