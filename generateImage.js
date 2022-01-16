const Canvas = require("canvas")
const Discord = require("discord.js")
const background = "./img/retrowave.png"

const avatar = {
    size: 256,
    x: 480,
    y: 170,
}

const dimensions = {
    height: 675,
    width: 1200,
    margin: 50
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: avatar.size})

    const canvas = Canvas.createCanvas(dimensions.width, dimensions.height)
    const context = canvas.getContext("2d")

    //draw in background
    const backImg = await Canvas.loadImage(background)
    context.drawImage(backImg, 0, 0)

    //draw white tinted box
    context.fillStyle = "rgba(0,0,0,0.2)"
    context.fillRect(dimensions.margin, dimensions.margin, dimensions.width - 2 * dimensions.margin, dimensions.height - 2 * dimensions.margin)

    const avatarImg = await Canvas.loadImage(avatarURL)
    context.save()

    context.beginPath()
    context.arc(avatar.x + avatar.size / 2, avatar.y + avatar.size / 2, avatar.size / 2, 0, Math.PI * 2, true)
    context.closePath()
    context.clip()

    context.drawImage(avatarImg, avatar.x, avatar.y)
    context.restore()

    // write in text
    context.fillStyle = "white"
    context.textAlign = "center"

    // draw in Welcome
    context.font = "50px Roboto"
    context.fillText("Bem vindo", dimensions.width/2, dimensions.margin + 70)

    // draw in the username
    context.font = "60px Roboto"
    context.fillText(username + "#" + discrim, dimensions.width/2, dimensions.height - dimensions.margin - 125)

    // draw in to the server
    context.font = "40px Roboto"
    context.fillText("ao servidor", dimensions.width / 2, dimensions.height - dimensions.margin - 50)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = generateImage