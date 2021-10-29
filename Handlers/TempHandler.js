const Discord = require('discord.js')
const fs = require('fs')

/**
 * 
 * @param {Discord.Client} bot 
 */
module.exports = async function ShowTemp(bot){
    const channelId = '903697884044730428'
    const channel = await bot.channels.fetch(channelId)
    const temp = parseInt(fs.readFileSync('/sys/class/thermal/thermal_zone0/temp', 'utf-8')) / 1000
    channel.setName(`${temp} °C`)
}