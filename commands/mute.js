var Discord = require('discord.js')
var ms = require('ms')

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('you can\'t use that command. ⚠️')

    var user = msg.mentions.users.first()
    if(!user) return msg.reply('you didn\'t mention anyone! ⚠️')

    var member

    try {
        member = await msg.guild.members.fetch(user)
    } catch(err) {
        member = null
    }

    if(!member) return msg.reply('they aren\'t in the server! ⚠️')
    if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('you cannot mute this user! ⚠️')

    var rawTime = args[1]
    var time = ms(rawTime)
    if(!time) return msg.reply('you didn\'t specify a time! ⚠️')

    var reason = args.splice(2).join(' ');
    if(!reason) return msg.reply('you need to give a reason! ⚠️')

    var channel = msg.guild.channels.cache.find(c => c.name === 'log')

    var log = new Discord.MessageEmbed()
    .setAuthor('✔️ User Muted')
    .addFields(
        { name: 'User:', value: user, inline: true },
        { name: 'By:', value: msg.author, inline: true },
        { name: 'Expires:', value: rawTime, inline: true },
        { name: 'Reason:', value: reason, inline: false })
    .setColor('#f5ce42')
    .setThumbnail('https://i.imgur.com/jCjF7ar.png')
    .setFooter(`© Patrick Bateman by ${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`)
    channel.send(log);

    var embed = new Discord.MessageEmbed()
    .setAuthor('🤐 You were muted!')
    .addFields(
        { name: 'Reason:', value: reason, inline: true },
        { name: 'Expires:', value: rawTime, inline: true })
    .setColor('#f5ce42')
    .setThumbnail('https://i.imgur.com/jCjF7ar.png')
    .setFooter(`© Patrick Bateman by ${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`)

    try {
        user.send(embed)
    } catch(err) {
        console.warn(err)
    }

    var role = msg.guild.roles.cache.find(r => r.name === 'muted')

    member.roles.add(role)

    setTimeout(async() => {
        member.roles.remove(role)
    }, time);

    msg.channel.send(`**${user}** has been muted by **${msg.author}** for **${rawTime}**!`)
}

module.exports.help = {
    name: 'mute',
    category: 'moderation',
    usage: '/mute @[username] [time] [reason]',
    description: 'time: s-seconds, h-hours'
}