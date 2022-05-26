import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import CustomHead from "../../components/head/Head";

function Error500({ error }) {
  const [errorID, setErrorID] = useState(null);

  const reportError = async () => {
    const post = await axios.post("https://mohammedfarish-public-api.herokuapp.com/v1/bin/mohammedfarish.com", {
      error,
    })
      .then((response) => response.data)
      .catch(() => null);
    if (!post) return;
    const { _id: id } = post;
    setErrorID(id);
  };

  useEffect(() => {
    if (error) reportError();
  }, []);

  return (
    <>
      <CustomHead
        title="Internal Server Error"
      />
      <div className="h-[87vh] w-full flex flex-col items-center justify-center text-mf-black select-none cursor-not-allowed -mt-[15vh]">
        <div className="text-2xl mb-6 text-center flex flex-col">
          <svg className="fill-[tomato] h-[12vh] mb-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.142 2l5.858 5.858v8.284l-5.858 5.858h-8.284l-5.858-5.858v-8.284l5.858-5.858h8.284zm.829-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-5.971 6h2v8h-2v-8zm1 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" /></svg>
          <h1 className="font-black text-6xl">500</h1>
          <span className="text-xl font-bold">Internal Server Error</span>
        </div>
        <div className="text-center w-3/4 xs:w-full ">
          {error ? (
            <span>
              As of right now, it is unclear what went wrong, but I have been notified
              about this particular incident, and I will investigate it and fix it, as
              soon as possible.
            </span>
          ) : (
            <span>
              I'm not sure what went wrong, but if you see this, it would be extremely
              useful if you could send me a screenshot of the page, so that I can fix it
              right away.
              <br />
              <br />
              <a href="mailto:contact@mohammedfarish.com">contact@mohammedfarish.com</a>
            </span>
          )}
        </div>
        {errorID ? (
          <span className="bg-[tomato] font-bold text-mf-white py-1 px-3 select-text cursor-text mt-6">{`Case ID: ${errorID}`}</span>
        ) : (
          <div hidden />
        )}
        <div className="mt-6">
          <Link replace href="/">
            <button
              className="h-8 font-bold w-32 bg-mf-black text-mf-white outline-none border-mf-black border-[1px] border-solid duration-[0.4s] cursor-pointer hover:bg-mf-white hover:text-mf-black"
              type="button"
            >
              GO HOME
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Error500;
