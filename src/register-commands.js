require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

function registerCommands(client) {
  const PREFIX = '!';

  client.on('message', (message) => {
      if (message.author.bot || !message.content.startsWith(PREFIX)) return;

      const args = message.content.slice(PREFIX.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      if (command === 'level') {
          checkLevel(message);
      }
      // Add more commands here if needed
  });
}

function checkLevel(message) {
  const userId = message.author.id;
  const userXP = userXP[userId] || 0;
  const userLevel = Math.floor(userXP / 100);

  message.channel.send(`${message.author.username}, you are currently level ${userLevel}.`);
}

module.exports = registerCommands;

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    
(async () => {
  try {
    console.log('Registering slash commands...');
    
    await rest.put(
      Routes.applicationGuildCommands (
        process.env. CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();