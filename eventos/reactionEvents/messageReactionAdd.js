const Discord = require('discord.js')
const ticket = require('../../database/models/tickets')
const cloudTicket = require('../../database/models/clouds')

module.exports.run = bot => {
    bot.on("messageReactionAdd", async (reaction, user) => {

        if (reaction.message.partial) {
            await reaction.message.fetch();
        }

        if(user.bot)return

        if(reaction.message.id !== '755159161251037285')return
        
        if(reaction.emoji.name === '☁️'){

            await reaction.users.remove(user.id);
            
            let newChannel = await reaction.message.guild.channels.create(`${user.username}-cloud-ticket`, {
                parent: '755227738129825873',
                permissionOverwrites: [
                {
                id: user.id,
                allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                }, {
                id: '755160787307200632',
                allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                }, {
                id: '755078640198483998',
                deny: ['VIEW_CHANNEL']
                }
                ]
            })
            let mensajeNewChannel = await newChannel.send(`Please be patient, a staff will atend you in a few seconds | Porfavor se paciente un staff te atandera en unos segundos\n<@&755160787307200632>,<@${user.id}>`)
            setTimeout(async () => {
                mensajeNewChannel.delete()
            }, 20 * 1000);

            let nuevo = new cloudTicket({
                userID: user.id,
                cloudID: newChannel.id
            })
            nuevo.save()
            
            await newChannel.send(`Describa el paquete de cloud que necesita | Let know us what is the package you want of your cloud`)
        }else if(reaction.emoji.name === '📄'){

            await reaction.users.remove(user.id);
            
            let newChannel = await reaction.message.guild.channels.create(`${user.username}-help`, {
                parent: '755227777959067779',
                permissionOverwrites: [
                {
                id: user.id,
                allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                }, {
                id: '755160703173787771',
                allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                }, {
                id: '755941221998002176',
                allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                }, {
                id: '755078640198483998',
                deny: ['VIEW_CHANNEL']
                }
                ]
            })

            let mensajeNewChannel = await newChannel.send(`Please be patient, a staff will atend you in a few seconds | Porfavor se paciente un staff te atandera en unos segundos\n<@&755160703173787771>,<@&755941221998002176>,<@${user.id}>`)
            setTimeout(async () => {
                mensajeNewChannel.delete()
            }, 20 * 1000);

            let nuevo = new ticket({
                userID: user.id,
                ticketID: newChannel.id
            })
            nuevo.save()
        }else if(reaction.emoji.name === '💵'){

            await reaction.users.remove(user.id);

            let newChannel = await reaction.message.guild.channels.create(`${user.username}-donation`, {
                parent: '755227777959067779',
                permissionOverwrites: [
                {
                id: user.id,
                allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                }, {
                id: '755235570506268734',
                allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                }, {
                id: '755078640198483998',
                deny: ['VIEW_CHANNEL']
                }
                ]
            })
            let mensajeNewChannel = await newChannel.send(`Please be patient, a special staff will atend you in a few seconds | Porfavor se paciente un staff especial te atandera en unos segundos\n<@&755235570506268734>,<@${user.id}>`)
            setTimeout(async () => {
                mensajeNewChannel.delete()
            }, 20 * 1000);

            let nuevo = new ticket({
                userID: user.id,
                ticketID: newChannel.id
            })
            nuevo.save()
        }else if(reaction.emoji.name === 'err'){

            await reaction.users.remove(user.id);
            
            let newChannel = await reaction.message.guild.channels.create(`${user.username}-report`, {
                parent: '755227777959067779',
                permissionOverwrites: [
                {
                id: user.id,
                allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                }, {
                id: '756189829414518894',
                allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                }, {
                id: '755941221998002176',
                allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                }, {
                id: '755160703173787771',
                allow: ['VIEW_CHANNEL','SEND_MESSAGES']
                }, {
                id: '755078640198483998',
                deny: ['VIEW_CHANNEL']
                }
                ]
            })
            let mensajeNewChannel = await newChannel.send(`Please be patient, a staff will atend you in a few seconds | Porfavor se paciente un staff te atandera en unos segundos\n<@&756189829414518894>,<@&755941221998002176>,<@&755160703173787771>,<@${user.id}>`)
            setTimeout(async () => {
                mensajeNewChannel.delete()
            }, 20 * 1000);

            let nuevo = new ticket({
                userID: user.id,
                ticketID: newChannel.id
            })
            nuevo.save()
        }else {
            return
        }
   
    });
  }