require('dotenv').config()
const Discord = require("discord.js")
const HandleProfile = require('../Handlers/ProfileHandler')
const DiscordAPI = require('./DiscordAPI')
const MySQL = require('./MySQL')

const intents = new Discord.Intents(32767)

module.exports = class Bot{
    #bot = new Discord.Client({
        intents
    })

    constructor() {
        // new MySQL()
        this.#bot.login(process.env.TOKEN)
        
        this.#bot.on('ready', () => {
            console.log(`${this.#bot.user.username} is online!`)
            this.#bot.user.setStatus("dnd")
            this.#bot.user.setActivity("DataHunt Gate", ({type: 'WATCHING'}))
            //this.#bot.user.setActivity("DataHunt Game", Discord.ActivityFlags.FLAGS.PLAY)
            // DiscordAPI.Send(":white_check_mark:")
            // DiscordAPI.Send(":x:")
        })

        this.#bot.on('messageCreate', message => {
            if(message.content.startsWith(process.env.PREFIX)){
                message.content = message.content.substr(1, message.content.length)
                HandleProfile(message)
                // console.log(message.content)
                // let embed = new Discord.MessageEmbed()
                // .setColor('#00ff00')
                // .addFields(
                //     { name: 'User:', value: message.author.username},
                //     { name: 'Message:', value: message.content},
                // )
                // .setAuthor("DataHunt")
                // .setThumbnail(message.author.avatarURL({
                //     dynamic: true
                // }))
                // .setTimestamp()
                // .setFooter("DataHunt")
                // message.channel.send({embeds: [embed] })
                // switch (`${message.content}`) {
                //     case "pizza":
                        
                //         break;
                
                //     default:
                //         break;
                // }
            }
            
        })
    }
}