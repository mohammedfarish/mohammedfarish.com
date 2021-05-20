export default async function deviceAuth(req) {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) return false;

    if (token !== process.env.DEVICE_AUTH) return false;

    return true;
  } catch (error) {
    return false;
  }
}
