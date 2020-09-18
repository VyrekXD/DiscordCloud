const Discord = require('discord.js');
const cloudTicket = require('../database/models/clouds')

module.exports = {
run: async (client, message, args) => {
 
    if(!message.member.roles.cache.has('755160787307200632')) return;
    
    let find = await cloudTicket.findOne({cloudID: message.channel.id})

    if(!find)return message.channel.send(`Esto no es una cloud! | This is not a cloud`)

    let newLimit = args[0]

    if(newLimit === 0)return message.channel.send(`0 its not an option | 0 no es una opcion`)
    if(newLimit === find.limit)return message.channel.send(`That was already the limit! | Ese ya era el limite!`)

    await cloudTicket.updateOne({cloudID: message.channel.id}, {$set: {limit: newLimit}})
    if(find.messages < newLimit){
        await cloudTicket.updateOne({cloudID: message.channel.id}, {$set: {cloudStatus: true}})   
    }

    message.channel.send(`The new limit is: ${newLimit} | El nuevo limite es: ${newLimit}`)
    }
}

