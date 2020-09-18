const Discord = require('discord.js');
const ticket = require('../database/models/tickets')

module.exports = {
run: async (client, message, args) => {
 
    if(!message.member.hasPermission('MANAGE_CHANNELS'))return


    let find = await ticket.findOne({
        ticketID: message.channel.id
    })

    if(!find)return message.channel.send(`Este canal no es un ticket | This channel is not a ticket`)

    message.channel.overwritePermissions(
        [
        {
            id: find.userID,
            deny: ['VIEW_CHANNEL']
        },
        {
            id: '755078640198483998',
            deny: ['VIEW_CHANNEL']
        },
        {
            id: '755941221998002176',
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        }, {
            id: '755160703173787771',
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        }
        ])

        const e = new Discord.MessageEmbed()
        .setTitle(`Ticket Closed`)
        .setColor('RANDOM')
        .setDescription(`What do you want to do?
        :x: Close the ticket | Cerrar el ticket
        :envelope_with_arrow: Open ticket | Abrir ticket
        :pushpin: Archive ticket | Archivar ticket`)

       let mensaje = await message.channel.send(e)

       await mensaje.react('❌')
       await mensaje.react('📩')
       await mensaje.react('📌')

       const filter = (reaction, user) => {return ['❌','📩','📌'].includes(reaction.emoji.name) && user.id === message.author.id}
       const collector = mensaje.createReactionCollector(filter, { time: 600000})
   
       collector.on('collect', async reaction =>{

        if(reaction.emoji.name === '❌'){

        mensaje.edit({embed: {color: 'RANDOM', description: `:x: Ticket Close | Ticket Cerrado`}})
        await ticket.deleteOne({ticketID: message.channel.id})
        mensaje.reactions.removeAll()
        collector.stop()
        setTimeout(() => {
            message.channel.delete()
        }, 10 * 1000);
        } else if(reaction.emoji.name === '📩'){

        mensaje.edit({embed: {color: 'RANDOM', description: `:envelope_with_arrow: Re-open ticket <@${find.userID}>`}})
        message.channel.send(`<@${find.userID}> The ticket is re-open | El ticket se re abrio`)

        let useruwu = client.users.cache.get(find.userID);
        useruwu.send(`<@${find.userID}> The ticket is re-open | El ticket se re abrio || ${find.ticketID.toString()}`)
        message.channel.overwritePermissions(
            [
            {
                id: find.userID,
                allow: ['VIEW_CHANNEL']
            },
            {
                id: '755078640198483998',
                deny: ['VIEW_CHANNEL']
            },
            {
                id: '755941221998002176',
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            }, {
                id: '755160703173787771',
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            }
            ])
        mensaje.reactions.removeAll()
        collector.stop()
        } else if(reaction.emoji.name === '📌'){

            mensaje.edit({embed: {color: 'RANDOM', description: `:pushpin: Ticket archivated | Ticket archivado`}})
            await ticket.deleteOne({ticketID: message.channel.id})
            mensaje.reactions.removeAll()
            collector.stop()
        }
       })
}
}

