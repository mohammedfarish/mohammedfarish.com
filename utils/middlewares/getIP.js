import isDev from "./isDev";

export default async function getIP(req) {
  let ip;

  const development = await isDev();
  // eslint-disable-next-line no-return-assign
  if (development) return ip = "dev";

  ip = req.headers["x-forwarded-for"];
  if (!ip) return false;
  // eslint-disable-next-line eqeqeq
  if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7);
  }

  return ip;
}
