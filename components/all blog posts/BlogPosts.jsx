import React from "react";
import Moment from "moment-timezone";
import Chance from "chance";

function BlogPosts({ posts }) {
  const chanceObj = new Chance();
  return (
    <>
      <div className="mf-section-header">
        <span>Blog Articles</span>
      </div>
      <div className="flex flex-col">
        {posts.map((item) => (
          <a
            key={chanceObj.guid()}
            href={`/blog/${item.slug}`}
            className="w-full flex items-center overflow-hidden min-h-[50px] px-2 py-1 justify-between hover:bg-mf-white"
          >
            <div className="flex items-center overflow-hidden">
              <span className="font-medium text-xs min-w-[60px] opacity-40">{Moment(item.date).format("DD MMM")}</span>
              <span className="font-medium text-lg">{item.title}</span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

export default BlogPosts;
