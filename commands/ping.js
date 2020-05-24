exports.run = async(client, msg, args) => {
    msg.channel.send(`${client.ws.ping}ms`)
}