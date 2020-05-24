var Discord = require('discord.js')

exports.run = async(client, msg, args) => {
    if (!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply('you can\'t use that command. ⚠️')

    var user = msg.mentions.users.first()
    if (!user) return msg.reply('you didn\'t mention anyone! ⚠️')

    try {
        member = await msg.guild.members.fetch(user)
    } catch(err) {
        member = null
    }

    if (!member) return msg.reply('they aren\'t in the server! ⚠️')
    if (member.hasPermission('MANAGE_MESSAGES')) return msg.reply('you cannot ban this user. ⚠️')
    
    var reason = args.splice(1).join(' ')
    if (!reason) return msg.reply('you need to give a reason! ⚠️')
    
    var channel = msg.guild.channels.cache.find(c => c.name === 'log')

    var log = new Discord.MessageEmbed()
        .setAuthor('✔️ User Banned')
        .addFields(
            { name: 'User:', value: user, inline: true },
            { name: 'By:', value: msg.author, inline: true },
            { name: 'Reason:', value: reason, inline: false })
        .setColor('#db1a1a')
        .setThumbnail('https://imgur.com/xzCNmMI.png')
        .setFooter(`© Patrick Bateman by ${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`)
    channel.send(log)

    var embed = new Discord.MessageEmbed()
        .setAuthor('🚫 You were banned!')
        .addField('Reason:', reason)
        .setColor('#db1a1a')
        .setThumbnail('https://imgur.com/xzCNmMI.png')
        .setFooter(`© Patrick Bateman by ${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`)

    try {
        await user.send(embed)
    } catch(err) {
        console.warn(err)
    }

    msg.guild.members.ban(user)
    msg.channel.send(`**${user}** has been banned by **${msg.author}**!`)
}

module.exports.help = {
    name: 'ban',
    category: 'moderation',
    usage: '/ban @[username] [reason]'
}