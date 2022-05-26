export default async (req, res) => {
  if (req.query.secret !== process.env.INTERNAL_KEY) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (!req.query.route || !req.query.route.startsWith("/")) {
    return res.status(503).json({ message: "Valid route not specified" });
  }

  try {
    await res.unstable_revalidate(req.query.route);
    return res.json({ route: req.query.route, revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
};
