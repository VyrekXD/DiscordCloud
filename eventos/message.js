const Discord = require('discord.js')
const cloudTicket = require('../database/models/clouds')

module.exports.run = bot => {
    bot.on("message", async message => {
  
        const prefix = bot.config.prefix

        if(message.author.bot) return;
        
        let find = await cloudTicket.findOne({cloudID: message.channel.id})
        if(find){

                if(find.cloudStatus === true){

                    await cloudTicket.updateOne({cloudID: message.channel.id}, {$inc: {messages: 1}})
                    
                if(find.messages === find.limit){
                    bot.users.resolve(find.userID).send({embed: {color: 0xFF000, description: `You quote of messages is done | Te has acabado tu cuota de mensajes`}})
                    await cloudTicket.updateOne({cloudID: message.channel.id}, {$set: {cloudStatus: false}})
                    await message.channel.overwritePermissions([
                        {
                            id: find.userID,
                            deny: ['SEND_MESSAGES']
                        },
                        {
                            id: '755160787307200632',
                            allow: ['SEND_MESSAGES']
                        },
                        {
                            id: '755078640198483998',
                            deny: ['SEND_MESSAGES']
                        }
                    ])

                }
                
            }
        }

        if(!message.content.startsWith(prefix)) return; 
        
        const args = message.content.slice(prefix.length).trim().split(/ +/g);  
        const command = args.shift().toLowerCase()
  
        let cmd = bot.comandos.get(command) || bot.comandos.find(c => c.aliases && c.aliases.includes(command))
        if(cmd)cmd.run(bot,message,args)
        
   
    });
  }