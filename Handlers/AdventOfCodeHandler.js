const Discord = require('discord.js')
const User = require('../Models/User')
const ProfilePicture = require('../Models/ProfilePicture')
const Fetch = require('../Core/Fetch')

let stats = undefined

/**
 * 
 * @param {Discord.Message} message
 */
module.exports = async function HandleAdventOfCode(message){
    if(typeof stats == "undefined"){
        await fetchStats()
    }
    if(message.content == "stats"){
        let embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle(`Advent of Code ${stats.event}`)
            .setAuthor("DataHunt")
            .setTimestamp()
            .setFooter("DataHunt")
        stats.members.map(member => {
            embed.addField(member.name, member.stars)
        })
        message.channel.send({embeds: [embed]})
    }
}

async function fetchStats(){
    let data = await Fetch(process.env.ADVENTOFCODE)
    let title = `Advent of Code ${data.event}`
    let members = []
    Object.values(data.members).map(member => {
        members.push({
            name: member.name,
            stars: `${member.stars} ⭐`
        })
    })
    stats = {
        title,
        members
    }
}

setInterval(async () => {
    await fetchStats()
}, 900000);