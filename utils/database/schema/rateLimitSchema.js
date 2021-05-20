const mongoose = require("mongoose");

const rateLimitSchema = mongoose.Schema({
  ip: String,
  reqCount: Number,
  initialReqAt: String,
  lastReqAt: String,
});

module.exports = mongoose.models.ratelimit || mongoose.model("ratelimit", rateLimitSchema);
