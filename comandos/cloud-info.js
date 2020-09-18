const Discord = require('discord.js');
const cloudTicket = require('../database/models/clouds')

module.exports = {
run: async (client, message, args) => {

    let cloud = args[0]
    let consulta = await cloudTicket.findOne({cloudID: cloud})

    if(!consulta)return message.channel.send(`I don't find that cloud | No encuentro esa cloud`)

    const e = new Discord.MessageEmbed()
    .setTitle(`${bot.users.resolve(find.userID).username} Cloud`)
    .setDescription(`
    CloudUser: ${bot.users.resolve(find.userID)}
    CloudID: ${find.cloudID}
    CloudStatus: ${find.cloudStatus}
    CloudMessages: ${find.messages}
    CloudLimit: ${find.limit}`)

    message.channel.send(e)
}
}
