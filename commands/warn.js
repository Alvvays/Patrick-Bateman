var Discord = require('discord.js')

exports.run = async(client, msg, args) => {
    if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('you can\'t use that command. ⚠️')

    var user = msg.mentions.users.first()
    if (!user) return msg.reply('you didn\'t mention anyone! ⚠️')

    var member
    try {
        member = await msg.guild.members.fetch(user)
    } catch(err) {
        member = null
    }

    if (!member) return msg.reply('they aren\'t in the server! ⚠️')
    if (member.hasPermission('MANAGE_MESSAGES')) return msg.reply('you cannot warn this user! ⚠️')

    var reason = args.splice(1).join(' ')
    if (!reason) return msg.reply('you need to give a reason! ⚠️')

    var channel = msg.guild.channels.cache.find(c => c.name === 'log')

    var log = new Discord.MessageEmbed()
        .setAuthor('✔️ User Warned')
        .addFields(
            { name: 'User:', value: user, inline: true },
            { name: 'By:', value: msg.author, inline: true },
            { name: 'Reason:', value: reason, inline: false })
        .setColor('#5911cf')
        .setThumbnail('https://i.imgur.com/Xz5tI13.png')
        .setFooter(`© Patrick Bateman by ${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`)
    channel.send(log)

    var embed = new Discord.MessageEmbed()
        .setAuthor('⚠️ You were warned!')
        .addField('Reason', reason)
        .setColor('#5911cf')
        .setThumbnail('https://i.imgur.com/Xz5tI13.png')
        .setFooter(`© Patrick Bateman by ${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`)

    try {
        user.send(embed)
    } catch(err) {
        console.warn(err)
    }

    msg.channel.send(`**${user}** has been warned by **${msg.author}**!`)
}

module.exports.help = {
    name: 'warn',
    category: 'moderation',
    usage: '/warn @[username] [reason]'
}