import Link from "next/link";
import React from "react";

function CardItem({
  name, loc,
  description,
}) {
  return (
    <a className="mf-btn-primary hover:no-underline m-5 w-80 h-96 p-4" href={loc}>
      <div className=" w-full h-3/5">
        {/* {icon} */}
      </div>
      <div className="h-2/5 flex flex-col  justify-center">
        <span className="font-bold text-2xl">{name}</span>
        <span className="text-sm">{description}</span>
      </div>
    </a>
  );
}

function Card({
  name, loc, description,
  icon, ssr,
}) {
  return ssr ? (
    <CardItem loc={loc} name={name} icon={icon} description={description} />
  ) : (
    <Link href={loc}>
      <CardItem loc={loc} name={name} icon={icon} description={description} />
    </Link>
  );
}

export default Card;
