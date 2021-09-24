const { Client, Intents, MessageEmbed } = require("discord.js");
const config = require("./config.json");
const bot = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });

bot.once("ready", () => {
    console.log(bot.user.username + " is ready!");
    bot.user.setPresence({
        activities: [
            {
                name: config.prefix + "help",
                type: "COMPETING"
            }
        ]
    })
});

bot.on("messageCreate", message => {
    if (message.author.bot || message.webhookId || !message.content.startsWith(config.prefix)) return;

    const raw_args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = raw_args.shift().toLowerCase();
    const args = raw_args.slice(0);

    var embed;
    var user;
    var responces = [];

    switch (command) {
        case "help":
        case "?":
            embed = new MessageEmbed()
                .setColor("ORANGE")
                .setTitle("Ahmed Bot Help")
                .setDescription("**Prefix**: `" + config.prefix + "`\n**Commands**:``` help\n ping\n invite\n beans\n hallo\n ala-ala\n kill <user>\n drink```\n**Made by [The Yule](https://github.com/TheYule) for Alton Brown**");
            message.channel.send({ embeds: [embed] });
            break;
        case "ping":
            embed = new MessageEmbed()
                .setColor("ORANGE")
                .setDescription("Pong! :ping_pong:");
            message.channel.send({ embeds: [embed] });
            break;
        case "invite":
            embed = new MessageEmbed()
                .setColor("ORANGE")
                .setTitle("Invite Ahmed Bot")
                .setDescription("[Click here!](https://discord.com/api/oauth2/authorize?client_id=891081837106036826&permissions=274878024704&scope=bot 'This is the link to invite me.')");
            message.channel.send({ embeds: [embed] });
            break;
        case "beans":
            embed = new MessageEmbed()
                .setColor("ORANGE")
                .setTitle("Beans")
                .setImage("https://cdn.discordapp.com/attachments/827029323302961175/829839791008383017/beans.png");
            message.channel.send({ embeds: [embed] });
            break;
        case "hallo":
            embed = new MessageEmbed()
                .setColor("ORANGE")
                .setTitle("Hallo")
                .setImage("https://cdn.discordapp.com/attachments/827029323302961175/829839659886313472/hallo.gif");
            message.channel.send({ embeds: [embed] });
            break;
        case "ala-ala":
            embed = new MessageEmbed()
                .setColor("ORANGE")
                .setDescription("ALA ALA");
            message.channel.send({ embeds: [embed] });
            break;
        case "kill":
            user = message.mentions.members.first();
            if (!user) return message.reply("Please mention a user or bot!");

            responces = [
                user.user.username + " died from dehydration. Its a desert retard.",
                user.user.username + " is  deemed unworthy and hit by a templar through a wall.",
                user.user.username + " was spotted going into constantinople and shot in the arm 4 times with a bow and arrow.",
                "The bridge was out " + user.user.username + "..."
            ]

            embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(responces[Math.floor(Math.random() * responces.length)]);
            message.channel.send({ embeds: [embed] });
            break;
        case "drink":
            responces = [
                "You drank from Kerak... You idiot. You have gained trait gangrene!",
                "You went to palmyra... Smart. You gained the trait thirst pacified!",
                "Drink from the damn ocean nice one bud. Oh damn that shark came out of nowhere.",
                "Allah grants you with water! Lucky you."
            ]

            embed = new MessageEmbed()
                .setColor("AQUA")
                .setDescription(responces[Math.floor(Math.random() * responces.length)]);
            message.channel.send({ embeds: [embed] });
            break;
        default:
            embed = new MessageEmbed()
                .setColor("RED")
                .setTitle("Unknown Command")
                .setDescription("That command doesn't exist!\nDo `" + config.prefix + "help` for help.");
            message.channel.send({ embeds: [embed] });
            break;
    }
});

bot.login(config.token);