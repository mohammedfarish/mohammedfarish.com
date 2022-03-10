import React, { useEffect, useState } from "react";
import Moment from "moment-timezone";
import { useRouter } from "next/router";

import Terminal from "./terminal/Terminal";

function Hero() {
  const [age, setAge] = useState(0);
  const router = useRouter();

  const calculateAge = () => {
    const todayYear = Moment().tz("Asia/Dubai").year();
    const birthYear = 1997;
    setAge(todayYear - birthYear);
  };

  useEffect(() => {
    calculateAge();
  }, []);

  return (
    <div className="mf-section">
      <div className="w-full  min-h-[50vh] flex py-[2%] xs:flex-col xs:mb-20">
        <div className="px-[2%] w-1/2 flex flex-col justify-center xs:px-0 xs:w-full xs:mb-20">
          <span className="font-bold text-2xl mb-4">I'm Mohammed Farish.</span>
          <span className="text-sm text-justify">
            I am a
            {" "}
            {age}
            -year old self-taught fullstack web and software developer,
            and I'm also one of the founders of
            {" "}
            <a className="font-bold text-mf-black" href="https://www.amnuz.com" target="https://www.amnuz.com">Amnuz Technologies</a>
            , a company that's deeply focused on the most futuristic projects you can imagine.
          </span>
        </div>
        <div className="mx-[2%] min-w-[60%] max-h-[50vh] flex justify-center flex-col ">
          <Terminal router={router} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
