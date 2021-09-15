const { default: axios } = require("axios");
const csvtojson = require("csvtojson");

const driveFetch = async (tab) => {
  const url = `https://docs.google.com/spreadsheets/d/e/${process.env.SHEET_ID}/pub?gid=${tab}&single=true&output=csv`;
  const db = await axios.get(url, { headers: { "Cache-Control": "no-store" } }).then((result) => result.data);
  return csvtojson().fromString(db);
};

module.exports = {
  driveFetch,
  tabs: {
    statusUpdate: "0",
  },
};
