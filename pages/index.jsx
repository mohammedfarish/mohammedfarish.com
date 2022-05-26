import React from "react";

import CustomHead from "../components/head/Head";
import LatestArticles from "../components/homepage/latest articles/LatestArticles";
import GetInTouch from "../components/homepage/contact/GetInTouch";
import Updates from "../components/homepage/updates/Updates";
import Hero from "../components/homepage/hero/Hero";
import Books from "../components/homepage/books/Books";

import fetchGoodReadsData from "../utils/functions/fetchGoodReadsData";

function Home({ bookData }) {
  return (
    <>
      <CustomHead />
      <div className="w-full flex flex-col">
        <Hero />
        <Updates />
        <LatestArticles />
        <Books books={bookData} />
        <GetInTouch />
      </div>
    </>
  );
}

export default Home;

export async function getStaticProps() {
  const booksReading = await fetchGoodReadsData();
  // const booksToRead = await fetchGoodReadsData("to-read");

  // console.log(booksReading);

  const formattedBookData = [
    {
      id: "40121378",
      title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
      shelf: "currently-reading",
      author: "James Clear",
      description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights.Clear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field.Learn how to:*  make time for new habits (even when life gets crazy);*  overcome a lack of motivation and willpower;*  design your environment to make success easier;*  get back on track when you fall off course;...and much more.Atomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits--whether you are a team looking to win a championship, an organization hoping to redefine an industry, or simply an individual who wishes to quit smoking, lose weight, reduce stress, or achieve any other goal.",
      avgRating: "4.38",
      bookPublished: "2018",
      guid: "https://www.goodreads.com/review/show/4603755798",
      images: {
        image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535115320l/40121378._SY75_.jpg",
        small: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535115320l/40121378._SY75_.jpg",
        medium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535115320l/40121378._SX98_.jpg",
        large: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535115320l/40121378._SY475_.jpg",
      },
      userRating: "0",
      userDateAdded: "Sat, 12 Mar 2022 09:15:33 -0800",
    },
    {
      id: "5472",
      title: "Animal Farm / 1984",
      author: "George Orwell",
      shelf: "read",
      description: "This edition features George Orwell’s best-known novels—1984 and Animal Farm—with an introduction by Christopher Hitchens.In 1984, London is a grim city where Big Brother is always watching you and the Thought Police can practically read your mind. Winston Smith joins a secret revolutionary organisation called The Brotherhood, dedicated to the destruction of the Party. Together with his beloved Julia, he hazards his life in a deadly match against the powers that be. Animal Farm is Orwell’s classic satire of the Russian Revolution - an account of the bold struggle, initiated by the animals, that transforms Mr. Jones’s Manor Farm into Animal Farm - a wholly democratic society built on the credo that All Animals Are Created Equal. But are they? AUTHOR: George Orwell (1903-1950) was born in India and served with the Imperial Police in Burma before joining the Republican Army in the Spanish Civil War. Orwell was the author of six novels as well as numerous essays and nonfiction works.",
      avgRating: "4.29",
      bookPublished: "1958",
      guid: "https://www.goodreads.com/review/show/4608633659",
      images: {
        image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327959366l/5472._SY75_.jpg",
        small: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327959366l/5472._SY75_.jpg",
        medium: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327959366l/5472._SX98_.jpg",
        large: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327959366l/5472.jpg",
      },
      userRating: "0",
      userDateAdded: "Mon, 14 Mar 2022 17:20:51 -0700",
    },
  ];
  return {
    props: {
      bookData: booksReading,
      bookData2: formattedBookData,
    },
    revalidate: 3600,
  };
}
