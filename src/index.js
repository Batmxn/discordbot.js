require('dotenv').config();
const { Client, IntentsBitField, SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const puppeteer = require('puppeteer');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('chatgpt')
    .setDescription('ask ChatGPT a question')
    .addStringOption(option => option.setName('prompt').setDescription('The prompt for the ai').setRequired(true)),
    async execute(interaction) {

        await interaction.reply({content: `Thinking...`, ephemeral: true});

        const { options } = interaction;
        const prompt = options.getString('prompt');

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://chat-app-f2d296.zapier.app/');

        const textBoxSelector = 'textarea[aria-label="chatbot-user-prompt"]';
        await page.waitForSelector(textBoxSelector);
        await page.type(textBoxSelector, prompt);

        await page.keyboard.press('Enter');

        await page.waitForSelector('[data-testid="final-bot-response"] p');

        var value = await page.$$eval('[data-testid="final-bot-response"]', async (element) => {
            return elements.map((element) => element.textContent);
        });

        setTimeout(async () => {
            if (value.length == 0) return await interaction.editReply({content: `I'm sorry, I couldn't find a response to your question.`, ephemeral: true});
        }, 30000)

        await browser.close();

        value.shift();
        const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setDescription(`\`\`\`${value.join(`\n\n\n\n`)}\`\`\``);

        await interaction.editReply({content: '', embeds: [embed] });
    }
}

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.log(`✅ ${c.user.username} is online`);
})

client.login(process.env.TOKEN);
