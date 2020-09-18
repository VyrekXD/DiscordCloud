const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userID: {type: String},
    ticketID: {type: String}
})

module.exports = mongoose.model("Ticket", schema);