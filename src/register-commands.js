require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'hey',
    description: 'Greets the user',
  },
  {
    name: 'ping',
    description: 'Pong!',
  },
  {
    name: 'website',
    description: 'Provides a link to the website',
  },
  {
    name: 'jokerstatus',
    description: 'Checks whether the Joker is loose or not',
  },
  {
    name: 'gcpd',
    description: 'Shows the gcpd\'s most wanted list',
  },
  {
    name: 'riddle',
    description: 'Gives you a riddle to solve',
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();