import { MetadataRoute } from "next";
import Moment from "moment-timezone";

import { siteURL } from "@/utils/data";

type PageObject = {
  location: string;
  priority: number;
  lastModified: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: PageObject[] = [
    {
      location: "",
      priority: 1,
      lastModified: Moment().startOf("day").format("YYYY-MM-DD"),
    },
  ].sort((a, b) => a.location.length - b.location.length);

  return pages.map((page) => {
    const { location, priority, lastModified } = page;

    return {
      url: `${siteURL}/${location}`,
      changeFrequency: "always",
      lastModified,
      priority,
    };
  });
}
