const Discord = require('discord.js')
const User = require('../Models/User')
const ProfilePicture = require('../Models/ProfilePicture')

/**
 * 
 * @param {Discord.Message} message 
 */
module.exports = async function HandleProfile(message){
    // console.log(message.author.username)
    // console.log(message.content)
    // console.log(message.member.nickname)
    let username = message.member.nickname ? message.member.nickname : message.author.username
    switch (message.content) {
        case "p":
        case "profile":
            // console.log(message.author.avatarURL({
            //     dynamic: true
            // }))
            let userId = await User.FindId({
                where: {
                    username
                }
            })
            if(userId){
                let profilePicture = await ProfilePicture.Find({
                    where: {
                        user_id: userId
                    }
                })
                let buf = Buffer.from(profilePicture.image.split(',')[1], 'base64')
                let file = new Discord.MessageAttachment(buf, 'profilePicture.jpeg')
                let embed = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .addFields(
                    { name: 'Showing profile of:', value: username},
                )
                .setAuthor("DataHunt")
                .setThumbnail('attachment://profilePicture.jpeg')
                .setTimestamp()
                .setFooter("DataHunt")
                message.channel.send({embeds: [embed], files: [file]})
            }
            else{
                message.channel.send("You don't have a profile picture yet")
            }
            break;
        default:
            break;
    }
}