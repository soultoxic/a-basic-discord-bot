const db = require('quick.db');
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'daily',
    description: "Gives You Your Daily Cash Bonus",
    usage: "?daily",
    run: async(client, message, args) => {
        let timeout = 86400000;
        let amount = 100;
        let user = message.author

        let daily =  await db.fetch(`daily_${message.guild.id}_${user.id}`)
        if(daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily))

            const dailyEmbed = new MessageEmbed()
            .setDescription(`You\'ve Already Collected your Daily Bonus. \n Come Back in ${time.hours}h, ${time.minutes}m and ${time.seconds}s`)
            .setColor("#f56c42")

            return message.channel.send(dailyEmbed)
        } else {
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now())

            const dailySuccess = new MessageEmbed()
            .setDescription(`Here, Take \$${amount} as Your Daily Cash Bonus!`)
            .setColor("BLUE")

            message.channel.send(dailySuccess)
        }
    }
}