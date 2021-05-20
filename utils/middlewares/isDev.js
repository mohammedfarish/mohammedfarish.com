export default function isDev() {
  const development = process.env.NODE_ENV === "development";
  if (!development) return false;

  return true;
}
