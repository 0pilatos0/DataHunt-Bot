const Discord = require('discord.js')
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
            .setTitle(`Advent of Code ${stats.title}`)
            .setAuthor("DataHunt")
            .setTimestamp()
            .setFooter("DataHunt")
        stats.members.map(member => {
            embed.addField(member.name, `${member.stars} [GitHub](https://www.github.com/${member.name.replace(" ", "")})`)
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
            stars: `${member.stars} ⭐`,
            score: member.local_score
        })
    })
    members.sort((a, b) => {
        return (a.score > b.score) ? -1 : 1
    })
    stats = {
        title,
        members
    }
}

setInterval(async () => {
    await fetchStats()
}, 900000);