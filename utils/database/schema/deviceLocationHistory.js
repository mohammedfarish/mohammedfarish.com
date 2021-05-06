const mongoose = require('mongoose');

const deviceLocationHistory = mongoose.Schema({
    device: String,
    wifi: String,
    batteryLevel: String,
    location: String,
    latlon: String,
    time: String
})

module.exports = mongoose.models.deviceLocationHistory || mongoose.model('deviceLocationHistory', deviceLocationHistory);