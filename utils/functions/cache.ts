import { Redis } from "ioredis";
import Moment from "moment-timezone";

const redis = new Redis(process.env.REDIS_URL || "");

type SaveToCache = {
  key: string;
  data: any;
  expire?: number;
};

export const saveToCache = async ({ key, data, expire = 86400 }: SaveToCache) => {
  await redis.set(
    key,
    JSON.stringify({
      data,
      updatedAt: Moment().format(),
    }),
    "EX",
    expire
  );
  return true;
};

type Cache = {
  data: any;
  updatedAt: string;
};

export const getFromCache = async (key: string) => {
  const data = await redis.get(key);
  if (!data) return null;
  return JSON.parse(data) as Cache;
};

export const deleteFromCache = async (key: string) => {
  await redis.del(key);
  return true;
};
