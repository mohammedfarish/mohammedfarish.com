const mongoose = require("mongoose");

const mongoCredential = process.env.MONGO_URI;

module.exports = async () => {
  await mongoose.connect(mongoCredential, {
    keepAlive: true
  });
  return mongoose;
};
