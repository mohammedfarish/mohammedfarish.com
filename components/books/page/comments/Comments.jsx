/* eslint-disable react/button-has-type */
import React from "react";
import Chance from "chance";
import Moment from "moment-timezone";
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("../../../markdown/Markdown"), {
  ssr: false,
});

function CommentBody({ item }) {
  const { rating } = item;
  const chanceObj = new Chance();
  return (
    <div
      className="w-full flex-col py-4 mx-auto mt-3 bg-white border-b-2 border-r-2 border-gray-200 drop-shadow-sm sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm "
    >
      <div className="flex flex-row md-10">
        <img
          className="w-12 h-12 border-2 border-gray-300"
          alt=""
          src={item.user.imageURL}
        />

        <div className="flex-col mt-1 w-full">

          <div className="flex items-center flex-1 px-4 mb-2 font-bold leading-tight ">
            {item.user.name}
            <span className="ml-2 text-xs font-normal text-gray-500">{Moment(item.date).fromNow()}</span>
            {rating ? (
              <div title={`Rating ${rating} of 5`} className="flex ml-4 mb-0">
                {Array.from({ length: rating }, () => (
                  <button key={chanceObj.guid()} className="appearance-none disabled:opacity-50" type="button" tabIndex="-1" aria-label="Rating 1 of 5">
                    <svg className="h-3 w-3 shrink-0 fill-amber-400" viewBox="0 0 256 256">
                      <path d="M239.2,97.4A16.4,16.4,0,0,0,224.6,86l-59.4-4.1-22-55.5A16.4,16.4,0,0,0,128,16h0a16.4,16.4,0,0,0-15.2,10.4L90.4,82.2,31.4,86A16.5,16.5,0,0,0,16.8,97.4,16.8,16.8,0,0,0,22,115.5l45.4,38.4L53.9,207a18.5,18.5,0,0,0,7,19.6,18,18,0,0,0,20.1.6l46.9-29.7h.2l50.5,31.9a16.1,16.1,0,0,0,8.7,2.6,16.5,16.5,0,0,0,15.8-20.8l-14.3-58.1L234,115.5A16.8,16.8,0,0,0,239.2,97.4Z" />
                    </svg>
                  </button>
                ))}
                {Array.from({ length: 5 - rating }, () => (
                  <button key={chanceObj.guid()} className="appearance-none disabled:opacity-50" type="button" tabIndex="-1" aria-label="Rating 4 of 5">
                    <svg className="h-3 w-3 shrink-0 fill-gray-300" viewBox="0 0 256 256">
                      <path d="M239.2,97.4A16.4,16.4,0,0,0,224.6,86l-59.4-4.1-22-55.5A16.4,16.4,0,0,0,128,16h0a16.4,16.4,0,0,0-15.2,10.4L90.4,82.2,31.4,86A16.5,16.5,0,0,0,16.8,97.4,16.8,16.8,0,0,0,22,115.5l45.4,38.4L53.9,207a18.5,18.5,0,0,0,7,19.6,18,18,0,0,0,20.1.6l46.9-29.7h.2l50.5,31.9a16.1,16.1,0,0,0,8.7,2.6,16.5,16.5,0,0,0,15.8-20.8l-14.3-58.1L234,115.5A16.8,16.8,0,0,0,239.2,97.4Z" />
                    </svg>
                  </button>
                ))}
              </div>
            ) : (
              <div hidden />
            )}
          </div>

          <div className="flex-1 w-full  px-2 ml-2 text-sm font-medium  text-gray-600">
            <Markdown text={item.bodyHTML} />
          </div>

        </div>

      </div>
    </div>
  );
}

function Comments({ data }) {
  const chanceObj = new Chance();

  return (
    <div className="w-full flex flex-col items-center">
      <section className="mt-10 flex flex-col items-center justify-center min-h-screen antialiased w-full bg-white">
        <div className="mf-section-header xs:flex-col xs:items-start font-bold text-2xl text-center w-full">
          <span>Popular Reviews</span>
          <span className="text-sm font-normal xs:text-xs xs:mb-2">
            Sourced from
            {" "}
            <a href="https://www.goodreads.com/" target="_blank" rel="noreferrer">
              goodreads.com
            </a>
          </span>
        </div>
        <div className="container px-0 mx-auto sm:px-5 w-full font-sans">
          {data.map((item) => (
            <CommentBody key={chanceObj.guid()} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Comments;
