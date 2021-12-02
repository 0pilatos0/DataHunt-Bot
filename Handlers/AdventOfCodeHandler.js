const Discord = require('discord.js')
const Fetch = require('../Core/Fetch')

let stats = undefined
let refreshedAt = undefined

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
            .setTitle(stats.title)
            .setAuthor("DataHunt")
            .setFooter(`Refreshed at: ${refreshedAt.toLocaleString()}`)
        stats.members.map(member => {
            embed.addField(member.name, `${member.stars} [${process.env.GITHUBICON}](https://www.github.com/${member.name.replace(/\s/g, "")})`)
        })
        embed.addField(`Advent of Code`, `[Leaderboard](${process.env.ADVENTOFCODE.replace(".json", "")})`)
        message.channel.send({embeds: [embed]})
    }
}

async function fetchStats(){
    refreshedAt = new Date()
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