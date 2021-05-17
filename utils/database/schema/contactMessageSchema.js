const mongoose = require('mongoose');

const contactMessageSchema = mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    ip: String,
    read: Boolean,
    date: String,
    deviceId: String,
}, {
    timestamps: true
})

module.exports = mongoose.models.contactmessage || mongoose.model('contactmessage', contactMessageSchema);