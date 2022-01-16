const Discord = require("discord.js");
require("dotenv").config();

const generateImage = require("./generateImage")

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
})

client.on("messageCreate", (message) => {
    if(message.content == "hi"){
        message.reply("Bufto");
    }
})

const welcomeChannelId = "932333092629278820";

client.on("guildMemberAdd", async (member) => {
    const image = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Bem vindo(a) ao servidor!`,
        files: [image]
    })
})

client.login(process.env.TOKEN);