import React from "react";
import dynamic from "next/dynamic";
import Moment from "moment-timezone";
import isDev from "isdev";

import AboutMe from "../AboutMe.json";
import CustomHead from "../../components/head/Head";
import GeneratedByOpenAI from "../../components/commons/GeneratedByOpenAI";
import { openaiCompletions } from "../../utils/functions/openai";

const Markdown = dynamic(() => import("../../components/markdown/Markdown"), { ssr: false });

const index = ({ aboutMe }) => (
  <>
    <CustomHead
      title="About Me"
      content="Get to know more about me."
    />
    <div className="xs:w-full w-1/2 text-justify hover:prose-a:text-mf-black">
      <Markdown text={aboutMe.text} />
      {aboutMe.text && (
        <GeneratedByOpenAI
          date={aboutMe.generatedAt}
          nextDate={aboutMe.nextGeneration}
        />
      )}
    </div>
  </>
);

export default index;

const calculateAge = () => {
  const birthDate = Moment("1997-06-07", "YYYY-MM-DD");
  const todayDate = Moment().tz("Asia/Dubai");
  const years = todayDate.diff(birthDate, "years");
  return years;
};

export async function getStaticProps() {
  const days = 7;

  let aboutMeText = `## About Me

I am **Mohammed Farish**, a fusion of Abu Dhabi's modernity and India's rich heritage. Born amidst the skyscrapers of Abu Dhabi and holding the vibrant essence of India, I've always navigated between these two contrasting worlds, drawing inspiration from both.

My academic journey might surprise you. I delved deep into the intricacies of Mechanical Engineering at the esteemed **RR Institute of Technology** in Bangalore, graduating in 2018. This foundation, combined with my earlier educational experiences from **Apex Public School** in Kozhikode and **Indian Islahi Islamic School** in Abu Dhabi, has shaped my analytical thinking and problem-solving prowess.

In 2019, I took a leap of faith and co-founded [Amnuz Technologies](https://www.amnuz.com). As its Lead Engineer, I've been at the forefront, innovating and crafting tools that revolutionize business workflows. My professional horizon expanded in 2022 when I joined the visionary team at [Telkom Communications](https://www.telkomcommunications.com) as an IT Engineer. Here, we're on a mission to redefine the future of Communications Infrastructure.

Technically speaking, I wield expertise in **Python**, **Go**, and **JavaScript**, crafting solutions that resonate with the end-users. My toolkit is diverse, ranging from **Vector Databases** to the **Adobe Creative Suite**, and the ever-reliable **Git**. And when it comes to development environments, **Visual Studio Code**, **Insomnia**, and **Slack** are my trusted allies.

Beyond the codes and algorithms, I find solace in the art of **Photography**, the thrill of **Traveling**, the magic of **Coding**, and the wisdom of **Podcasts**. My guiding star? A mission to "_Develop software that doesn't just work, but changes lives._"

Let's embark on a journey together. Whether it's a collaboration, a brainstorming session, or just a casual chat, [drop me an email](mailto:contact@mohammedfarish.com). You can also catch glimpses of my life and work on [Twitter](https://twitter.com/faaaaaarish), [LinkedIn](https://www.linkedin.com/in/mohammedfarish/), [Instagram](https://www.instagram.com/mohammed_farish/), and [Facebook](https://www.facebook.com/weezy978/).

Thank you for pausing here. I'm eager to craft the future, one line of code at a time, and I hope you'll join me on this exhilarating journey!
`;

  const infoAboutMe = {
    age: calculateAge(),
    learned: "self-taught",
    ...AboutMe,
  };

  const formatted = JSON.stringify(infoAboutMe);

  const prompt = `Write a creative, interesting and highly convincing "about me" with the informations provided below. around 2000 - 3000 characters long. in markdown format. Hyperlinks. Filter out unneccessary information.
  
  ${formatted}`;

  if (isDev) {
    aboutMeText = await openaiCompletions({ prompt })
      .catch(() => null);
  }

  let revalidate = 60 * 60 * 24 * days;
  if (!aboutMeText) revalidate = 60;

  return {
    props: {
      aboutMe: {
        text: aboutMeText,
        generatedAt: Moment().format(),
        nextGeneration: Moment().add(days, "day").format(),
      },
    },
    revalidate,
  };
}
