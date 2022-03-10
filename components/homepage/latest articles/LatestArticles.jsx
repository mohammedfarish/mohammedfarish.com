import React, { useEffect, useState } from "react";
import Link from "next/link";
import Chance from "chance";
import Moment from "moment-timezone";
import axios from "axios";

function LatestArticles() {
  const chanceObj = new Chance();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/blog/list?type=latest").then((res) => {
      setPosts(res.data);
    });
  }, []);

  if (posts.length === 0) return <div hidden />;

  return (
    <section className="mf-section">
      <div className="mf-section-header">
        <span>Latest Articles</span>
        <Link href="/blog">
          <a href="/blog" className="mf-btn-primary text-sm xs:text-xs xs:font-bold portrait:hidden">
            <button type="button">
              View All Articles
            </button>
          </a>
        </Link>
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
    </section>
  );
}

export default LatestArticles;
