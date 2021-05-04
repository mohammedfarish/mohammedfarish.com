const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    displayName: String,
    username: String,
    email: String,
    password: String,
    role: String,
    verified: Boolean,
    verifiedBy: String,
    active: Boolean,
    activeSince: Date,
    sessions: Array,
    remarks: Array
}, {
    timestamps: true
})

module.exports = mongoose.models.user || mongoose.model('user', userSchema);