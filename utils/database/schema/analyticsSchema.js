const mongoose = require("mongoose");

const analyticsSchema = mongoose.Schema({
  _id: String,
  userAgent: String,
  initialActivity: String,
  lastActivity: String,
  visitCount: Number,
  activityData: Array,
  remarks: Array,
});

module.exports = mongoose.models.analytic || mongoose.model("analytic", analyticsSchema);
