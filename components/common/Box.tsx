import React from "react";
import { twMerge } from "tailwind-merge";

const Box = ({ className, onClick, children }: { className?: string; onClick?: () => void; children: React.ReactNode }) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "bg-gray-200 aspect-square p-2 select-none cursor-pointer",
        "border-t-4 border-t-gray-300",
        "border-l-4 border-l-gray-300",
        "border-r-4 border-r-gray-500",
        "border-b-4 border-b-gray-500",
        "shadow shadow-gray-500",
        "hover:shadow hover:shadow-gray-500",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
