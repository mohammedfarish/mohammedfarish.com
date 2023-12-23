import React from "react";
import Moment from "moment-timezone";
import isdev from "isdev";

import CustomHead from "../components/head/Head";
import LatestArticles from "../components/homepage/latest articles/LatestArticles";
import GetInTouch from "../components/homepage/contact/GetInTouch";
import Updates from "../components/homepage/updates/Updates";
import Hero from "../components/homepage/hero/Hero";
import Books from "../components/homepage/books/Books";
import AboutMe from "./AboutMe.json";

import fetchGoodReadsData from "../utils/functions/fetchGoodReadsData";
import { openaiCompletions } from "../utils/functions/openai";

function Home({ bookData, shortAboutMe }) {
  return (
    <>
      <CustomHead />
      <div className="w-full flex flex-col">
        <Hero shortAboutMe={shortAboutMe} />
        <Updates />
        <LatestArticles />
        <Books books={bookData} />
        <GetInTouch />
      </div>
    </>
  );
}

export default Home;

const calculateAge = () => {
  const birthDate = Moment("1997-06-07", "YYYY-MM-DD");
  const todayDate = Moment().tz("Asia/Dubai");
  const years = todayDate.diff(birthDate, "years");
  return years;
};

export async function getStaticProps() {
  let days = 7;

  const booksReading = await fetchGoodReadsData()
    .catch(() => {
      days = 3;
      return [];
    });

  const formattedAboutMeObj = {
    profession: AboutMe.professionalExperience[0],
    about: AboutMe.introduction.about,
  };

  const infoAboutMe = {
    age: calculateAge(),
    learned: "self-taught",
    ...formattedAboutMeObj,
  };

  const formatted = JSON.stringify(infoAboutMe);

  const prompt = `Write a short, creative, interesting and highly convincing "about me" with the informations provided below. maximum 200 characters. in markdown format. Hyperlinks. Filter out unneccessary information. headings not required1 g444wddddddddfhhhhhhh

  
  ${formatted}`;

  let shortAboutMe = `I'm a ${calculateAge()} year old software and full-stack web developer, self-taught and passionate about the craft. I'm the Co-Founder and Head Engineer of [Amnuz Technologies](https://www.amnuz.com) and our goal is to build and manage tools that simplify business workflows. I'm always striving to make a positive impact and bring the best out of technology.`;

  if (isdev) {
    shortAboutMe = await openaiCompletions({ prompt })
      .catch(() => {
        days = 1;
        return shortAboutMe;
      });
  }

  return {
    props: {
      bookData: booksReading,
      shortAboutMe: {
        text: shortAboutMe,
        generatedAt: Moment().format(),
        nextGeneration: Moment().add(days, "day").format(),
      },
    },
    revalidate: 60 * 60 * 24 * days,
  };
}
