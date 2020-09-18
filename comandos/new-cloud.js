const Discord = require('discord.js');
const cloudTicket = require('../database/models/clouds')

module.exports = {
aliases: [],
run: async (client, message, args) => {
 
    if(!message.member.roles.cache.has('755160787307200632'))return

    let find = await cloudTicket.findOne({cloudID: message.channel.id})

    if(!find)return message.channel.send(`Esto no es una cloud! | This is not a cloud`)
    if(find.cloudStatus === true)return message.channel.send(`Esta cloud ya esta activada | This cloud is activated`)

    let limitMessages = args[0]

    if(!limitMessages)return message.channel.send(`Necesitas poner un limite de mensajes | You need to put the messages limit`)

    let u = {
        true: 'On',
        false: 'Off'
    }
    find = await cloudTicket.findOneAndUpdate({cloudID: message.channel.id}, {$set: {cloudStatus: true}, $inc: {limit: parseInt(limitMessages)}}, { new: true })
    let useruwu = client.users.cache.get(find.userID);

    const e = new Discord.MessageEmbed()
    .setColor(`RANDOM`)
    .setTitle(`New Cloud | Nueva cloud`)
    .setDescription(`
    Cloud: **${client.users.cache.get(find.userID)}**
    CloudID: **${find.cloudID}**
    CloudStatus: **${u[find.cloudStatus]}**
    CloudMessagesLimit: **${find.limit}**
    `)
    message.channel.send(e)

    message.channel.setName(`${useruwu.username}-cloud`)

    message.channel.send('Todos los mensajes seran eliminados en 1 minuto no mande ningun mensaje porfavor | All the messages gone get eliminated in 1 minute please dont send any message')
    setTimeout(() => {
        message.channel.bulkDelete(100)
        message.channel.bulkDelete(100)
    }, 60*1000);

    }
}
