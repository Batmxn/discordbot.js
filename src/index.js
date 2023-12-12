require('dotenv').config();
const { Client, IntentsBitField, SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const puppeteer = require('puppeteer');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

const PREFIX = '!';
const XP_PER_MESSAGE = 100;

const userXP = {};

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('message', (message) => {
    if (message.author.bot) return;

    // Increment user XP
    const userId = message.author.id;
    userXP[userId] = (userXP[userId] || 0) + XP_PER_MESSAGE;

    // Check for level-up
    const userLevel = Math.floor(userXP[userId] / 100);
    if (userLevel > 0) {
        message.channel.send(`${message.author.username}, you leveled up to level ${userLevel}!`);
    }

    // Check for commands
    if (message.content.startsWith(PREFIX)) {
        const args = message.content.slice(PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        // Add more commands if needed
        if (command === 'level') {
            message.channel.send(`You are currently level ${userLevel}.`);
        }
    }
});

registerCommands(client);

client.on('message', (message) => {
    if (message.author.bot) return;

    // Increment user XP
    const userId = message.author.id;
    userXP[userId] = (userXP[userId] || 0) + XP_PER_MESSAGE;

    // Check for level-up
    const userLevel = Math.floor(userXP[userId] / 100);
    if (userLevel > 0) {
        message.channel.send(`${message.author.username}, you leveled up to level ${userLevel}!`);
        // You can add additional actions when a user levels up
    }
});


client.on('ready', (c) => {
    console.log(`✅ ${c.user.username} is online`);
})

client.login(process.env.TOKEN);
