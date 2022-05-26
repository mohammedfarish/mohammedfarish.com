import React from "react";
import Moment from "moment-timezone";
import Chance from "chance";

function BlogPosts({ posts }) {
  const chanceObj = new Chance();
  return (
    <>
      <div className="mf-section-header w-full">
        <span>Blog Articles</span>
      </div>
      <div className="flex flex-col -mt-4  w-full items-center">
        {posts.map((item) => (
          <div
            className="my-2 flex flex-col w-full "
            key={chanceObj.guid()}
          >
            <div className="mf-section-header border-0  border-mf-grey px-4 my-0 select-none justify-start items-center  py-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 mt-1 fill-mf-black" viewBox="0 0 24 24"><path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z" /></svg>
              <span className="mx-5 py-0 text-lg font-black ">{item.year}</span>
            </div>
            {item.data.map((post) => (
              <a
                key={chanceObj.guid()}
                href={`/blog/${post.slug}`}
                className="w-full flex items-center overflow-hidden min-h-[50px] px-2 py-1 justify-between hover:bg-mf-white "
              >
                <div className="flex items-center overflow-hidden">
                  <span className="font-medium text-xs min-w-[60px] opacity-40">{Moment(post.date).format("DD MMM")}</span>
                  <span className="font-medium text-lg">{post.title}</span>
                </div>
              </a>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default BlogPosts;
