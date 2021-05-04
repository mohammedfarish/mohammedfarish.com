const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: String,
    deviceIP: String,
    active: Boolean
}, {
    timestamps: true
})

module.exports = mongoose.models.session || mongoose.model('session', userSchema);