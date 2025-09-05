import axios from "axios";
import moment from "moment-timezone";
import { getFromCache, saveToCache } from "./cache";

const url = process.env.R_API_URI + "/json/launches/next/5";

type LaunchData = {
  valid_auth: boolean;
  count: number;
  limit: number;
  total: number;
  last_page: number;
  result: Array<{
    id: number;
    cospar_id: string | null;
    sort_date: string;
    name: string;
    provider: {
      id: number;
      name: string;
      slug: string;
    };
    vehicle: {
      id: number;
      name: string;
      company_id: number;
      slug: string;
    };
    pad: {
      id: number;
      name: string;
      location: {
        id: number;
        name: string;
        state: string | null;
        statename: string | null;
        country: string;
        slug: string;
      };
    };
    missions: Array<{
      id: number;
      name: string;
      description: string | null;
    }>;
    mission_description: string | null;
    launch_description: string;
    win_open: string | null;
    t0: string | null;
    win_close: string | null;
    est_date: {
      month: number | null;
      day: number | null;
      year: number | null;
      quarter: number | null;
    };
    date_str: string;
    tags: Array<{
      id: number;
      text: string;
    }>;
    slug: string;
    weather_summary: string | null;
    weather_temp: string | null;
    weather_condition: string | null;
    weather_wind_mph: string | null;
    weather_icon: string | null;
    weather_updated: string | null;
    quicktext: string;
    media: any[];
    result: number | null;
    suborbital: boolean;
    modified: string;
  }>;
};

export const getNextRocketLaunch = async (uncached?: boolean) => {
  let cachedData: LaunchData | undefined = undefined;

  const cacheName = "next-rocket-launch";

  if (!uncached) {
    const cached = await getFromCache(cacheName);
    if (cached) cachedData = cached.data as LaunchData;
  }

  const data = cachedData || (await axios.get(url).then((response) => response.data as LaunchData));

  const results = !data
    ? []
    : data.result
        .map((item) => {
          const t0 = moment(item.t0);

          return {
            ...item,
            t0,
            t0Unix: t0.unix(),
          };
        })
        .filter((item) => {
          const now = moment();
          const then = moment(item.t0);
          return then.isAfter(now);
        })
        .sort((a, b) => a.t0Unix - b.t0Unix);

  const nextLauch = results[0];

  const launchLocation = [nextLauch.pad.location.name, nextLauch.pad.location.country].join(", ");
  const mission = nextLauch.missions.map((mission) => mission.name).join(", ");
  const time = moment(nextLauch.t0).fromNow();
  const provider = nextLauch.provider.name;
  const vehicle = nextLauch.vehicle.name;

  const launchDesc = `Upcoming Rocket Launch: 🚀\n\n${provider} is launching ${vehicle} for ${mission} Mission from ${launchLocation} ${time}.\n`;

  const expire = moment().add(30, "minutes").diff(moment(), "seconds");

  await saveToCache({
    key: cacheName,
    data: data,
    expire: expire,
  });

  return launchDesc;
};
