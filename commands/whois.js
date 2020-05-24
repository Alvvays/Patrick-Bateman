var Discord = require('discord.js')
var client = new Discord.Client()

exports.run = async(client, msg, args) => {
    var member = msg.mentions.users.first() || msg.author
    let whoEmbed = new Discord.MessageEmbed()
        .setAuthor('👀 whoIs')
        .setDescription('ID: ' + member.id)
        .addFields(
            { name: 'Username:', value: member.username, inline: true },
            { name: 'Discriminator:', value: member.discriminator, inline: true },
            { name: 'Status:', value: member.presence.status })
            .setColor('#00ff44')
            .setFooter(`© Patrick Bateman by ${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`)
    if (msg.content.includes('/whois')) {
        msg.channel.send(whoEmbed)
        return
    } 
}