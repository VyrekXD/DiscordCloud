const mongoose = require("mongoose");
module.exports = mongoose.connect('mongodb+srv://discordcloud:tomas1254@discordcloudbot.hjx1j.mongodb.net/database?retryWrites=true&w=majority', { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
    })