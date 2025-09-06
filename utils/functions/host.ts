import { headers } from "next/headers";

export const getDomain = async () => {
  const headersList = await headers();
  const host = headersList.get("host");
  if (!host) throw new Error("Host not found");
  return host;
};

export const getIP = async () => {
  const headersList = await headers();
  const ipHeaders = ["cf-connecting-ip", "x-forwarded-for", "x-real-ip", "x-client-ip", "x-forwarded"];
  const ip = ipHeaders.map((header) => headersList.get(header)).find((ip) => ip !== null && ip !== undefined);
  if (ip) return ip;
  throw new Error("IP not found");
};
