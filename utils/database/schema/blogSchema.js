const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  slug: String,
  slugRef: String,
  date: String,
  content: String,
  author: Object,
  publish: Boolean,
  listed: Boolean,
});

module.exports = mongoose.models.blogpost || mongoose.model("blogpost", blogSchema);
