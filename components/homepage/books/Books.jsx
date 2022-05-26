import React from "react";
import Link from "next/link";
import Chance from "chance";
import Moment from "moment-timezone";
import isDev from "isdev";

function BookCard({ book, type }) {
  return (
    <Link href={`/books/${book.id}`}>
      <a
        href={`/books/${book.id}`}
        className="mf-btn-primary py-4 h-96 w-60  mx-3 xs:my-6 hover:no-underline flex flex-col items-center "
        title={book.title}
      >
        <img
          className="h-4/5 xs:h-3/4 top-0 mf-bevel drop-shadow-mf rounded-md"
          src={book.images.large}
          alt={`${book.title} Cover`}
        />
        <div className="h-1/5 flex flex-col items-center justify-center w-[90%]">
          {type === "currently-reading" ? (
            <span className="line-clamp-1 w-full text-center font-black text-lg">{book.title.split(":")[0]}</span>
          ) : (
            <span className="line-clamp-2 w-full text-center font-black text-lg">{book.title.split(":")[0]}</span>
          )}
          <span className="text-xs ">
            {type === "currently-reading" ? (
              "Started"
            ) : (
              "Finished"
            )}
            {" "}
            {Moment(book.userDateAdded).fromNow()}
          </span>
        </div>
        {type === "currently-reading" ? (
          <div className="flex flex-col items-center justify-center w-full font-bold px-2 py1 text-xs">
            <span>(Reading Now)</span>
            <div className="flex items-center justify-center mt-2  ">
              <div className="flex space-x-2 animate-pulse">
                <div className="w-2 h-2 bg-[green] rounded-full" />
                <div className="w-2 h-2 bg-[green] rounded-full" />
                <div className="w-2 h-2 bg-[green] rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          <div hidden />
        )}
      </a>
    </Link>
  );
}

function Books({ books }) {
  const chanceObj = new Chance();

  if (books.length === 0) return <div hidden />;

  return (
    <section className="mf-section">
      <div className="mf-section-header">
        <span>Books I'm Reading</span>
        {isDev ? (
          <Link href="/books">
            <a href="/books" className="mf-btn-primary text-sm xs:text-xs xs:font-bold portrait:hidden">
              <button type="button">
                View All Books I Read
              </button>
            </a>
          </Link>
        ) : (
          <div hidden />
        )}
      </div>
      <div className="flex items-center flex-wrap w-full xs:justify-center">
        {books.map((book) => (book.shelf === "currently-reading" ? (
          <BookCard key={chanceObj.guid()} book={book} type="currently-reading" />
        ) : (
          <div key={chanceObj.guid()} hidden />
        )))}
        {books.map((book) => (book.shelf !== "currently-reading" && book.shelf !== "to-read" ? (
          <BookCard key={chanceObj.guid()} book={book} type="read" />
        ) : (
          <div key={chanceObj.guid()} hidden />
        )))}
      </div>
    </section>
  );
}

export default Books;
