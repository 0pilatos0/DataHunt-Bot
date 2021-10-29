const Discord = require('discord.js')

/**
 * 
 * @param {Discord.Client} bot 
 */
module.exports = async function ShowTemp(bot){
    const channelId = '903633080697380874'
    const channel = await bot.channels.fetch(channelId)
    channel.setName('temp')
    console.log(channel.name)
}