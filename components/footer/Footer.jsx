import React from "react";
import Link from "next/link";
import Chance from "chance";

function Footer() {
  const chanceObj = new Chance();

  const menuItems = [
    {
      name: "Home",
      loc: "/",
    },
    {
      name: "Privacy Policy",
      loc: "/privacy-policy",
    },
    {
      name: "Blog",
      loc: "/blog",
    },
  ];

  return (
    <div className="py-4 flex items-center justify-center flex-col bg-mf-white select-none bottom-0 w-screen  border-0 border-t-[0px] border-mf-button-top-section">
      <div className=" w-full flex justify-center items-center flex-wrap h-16">
        {menuItems.map((item) => (item.external ? (
          <a key={chanceObj.guid()} href={item.loc} target="_blank" className=" mx-2 my-1 px-4 py-1  font-medium text-xs text-mf-black hover:no-underline" rel="noreferrer">
            {item.name}
          </a>
        ) : (
          <Link key={chanceObj.guid()} href={item.loc}>
            <a href={item.loc} className=" mx-2 my-1 px-4 py-1  font-medium text-xs text-mf-black hover:no-underline">
              {item.name}
            </a>
          </Link>
        )))}
      </div>
      <Link href="/">
        <a href="/" className="my-2 opacity-50 text-xs duration-[0.4s] hover:no-underline hover:opacity-75">
          ©
          {" "}
          {new Date().getFullYear()}
          {" "}
          Mohammed Farish. All rights reserved.
        </a>
      </Link>
    </div>
  );
}

export default Footer;
