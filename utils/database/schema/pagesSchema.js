const mongoose = require("mongoose");

const webpagesSchema = mongoose.Schema({
  type: String, // 'page', 'blog'
  name: String, // name for your reference
  location: String, // should not start with "/"
});

module.exports = mongoose.models.webpages || mongoose.model("webpages", webpagesSchema);
