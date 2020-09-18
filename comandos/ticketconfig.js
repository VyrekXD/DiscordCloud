const Discord = require('discord.js')

module.exports = {
run: async(client, message, args) => {

    if(!message.member.roles.cache.has('755160787307200632')) return;

    const e = new Discord.MessageEmbed()
    .setTitle(`**Tickets**`)
    .setColor(`RED`)
    .setDescription(`
    :dollar: Transactions and payments | Transacciones y pagos
    :page_facing_up: Information of clouds | Informaciones de las nubes
    :cloud: Request Cloud | Solicitar Nube
    <a:err:751134693830819902> Report an error | Reportar un error
    `)
    .setTimestamp()

    let mensaje = await message.channel.send(e)

    let emojiErr = client.emojis.resolve("751134693830819902")
    await mensaje.react('💵')
    await mensaje.react('📄')
    await mensaje.react('☁️')
    await mensaje.react(emojiErr)
    }
}