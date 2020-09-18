const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userID: {type: String},
    cloudID: {type: String},
    messages: {type: Number, default: 0},
    limit: {type: Number, default: 0},
    cloudStatus: {type: Boolean, default: false}
})

module.exports = mongoose.model("cloudsTicket", schema);