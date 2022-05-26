import React from "react";
import Link from "next/link";

import CustomHead from "../../components/head/Head";

function Error404() {
  return (
    <>
      <CustomHead title="Error 404" />
      <div className="h-[87vh] w-full flex flex-col items-center justify-center text-mf-black select-none cursor-not-allowed -mt-[15vh]">
        <div className="text-2xl mb-6 text-center flex flex-col">
          <svg className="fill-mf-black h-[12vh] mb-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.142 2l5.858 5.858v8.284l-5.858 5.858h-8.284l-5.858-5.858v-8.284l5.858-5.858h8.284zm.829-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-5.971 6h2v8h-2v-8zm1 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" /></svg>
          <h1 className="font-black text-6xl">404</h1>
          <span className="text-xl font-bold">Page not Found</span>
        </div>
        <span>Are you sure that's the page you were looking for?</span>
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

export default Error404;
