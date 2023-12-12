require('dotenv').config();
const { Client, IntentsBitField, ActivityType, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const alfredGreetings = [
        "Good day, sir. How may I be of service?",
        "Welcome back, master. Is there anything I can assist you with?",
        "Greetings, sir. I trust your endeavors are proceeding smoothly.",
        "Ah, it's a pleasure to see you again, sir. What brings you here today?",
        "Sir, I hope your day is off to an excellent start. How may I assist you?",
        "Welcome, master. Your presence always brightens the virtual halls.",
        "Good to see you, sir. Is there a particular matter that requires attention?",
        "Sir, may I extend my warmest greetings to you on this fine day?",
        "Ah, the prodigal user returns! How may I serve you today, sir?",
        "Greetings, sir. As always, I am at your disposal for any assistance you may require.",
        "Master, your arrival is most welcome. How may I assist you at this moment?",
    ];

    const mostWantedList = [
        {
            rank: '#1',
            name: 'The Joker',
            alias: 'Clown Prince of Crime',
            description: 'Known for his chaotic and unpredictable nature. Approach with extreme caution.',
        },
        {
            rank: '#2',
            name: 'Two-Face',
            alias: 'Harvey Dent',
            description: 'Former district attorney turned criminal mastermind. Has a coin that determines his decisions.',
        },
        {
            rank: '#3',
            name: 'Bane',
            alias: 'The Man Who Broke the Bat',
            description: 'Enhanced strength and intelligence. Highly skilled in hand-to-hand combat.',
        },
        {
            rank: '#4',
            name: 'Harley Quinn',
            alias: 'The Joker\'s Gal',
            description: 'Former psychiatrist turned accomplice of The Joker. Skilled gymnast and proficient with various weapons.',
        },
        {
            rank: '#5',
            name: 'Poison Ivy',
            alias: 'The Botanical Bio-Terrorist',
            description: 'Possesses control over plants and toxins. Advocate for environmental protection, with a dangerous edge.',
        },
        {
            rank: '#6',
            name: 'Catwoman',
            alias: 'The Feline Fatale',
            description: 'Master thief with a complex relationship with Batman. Exceptional agility and combat skills.',
        },
        {
            rank: '#7',
            name: 'Mr. Freeze',
            alias: 'The Cryonic Criminal',
            description: 'Former scientist turned cryogenic criminal. Uses a freeze gun to create ice-based weaponry.',
        },
        {
            rank: '#8',
            name: 'Scarecrow',
            alias: 'Master of Fear',
            description: 'Psychiatrist turned criminal who uses fear-inducing toxins. Exploits the fears of his victims.',
        },
    ];

    const riddlesArray = [
        "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
        "The more you take, the more you leave behind. What am I?",
        "What has keys but can't open locks?",
        "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I?",
        "The person who makes it, sells it. The person who buys it never uses it. What is it?",
        "The more you cut me, the bigger I grow. What am I?",
        "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
        "I fly without wings. I cry without eyes. Wherever I go, darkness follows me. What am I?",
        "I am always hungry. I must always be fed. The finger I touch will soon turn red. What am I?",
        "What comes once in a minute, twice in a moment, but never in a thousand years?"
      ];
    
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;
    
        if (interaction.commandName === 'hey') {
                const randomResponse = alfredGreetings[Math.floor(Math.random() * alfredGreetings.length)];
                return interaction.reply(randomResponse);
        }
    
        if (interaction.commandName === 'ping') {
            return interaction.reply('Pong!');
        }

        if (interaction.commandName === 'website') {
                return interaction.reply('https://oliverjsmith.xyz');
        }

        if (interaction.commandName === 'jokerstatus') {
                const randomNumber = Math.floor(Math.random() * 100);

                if (randomNumber < 5) {
                        return interaction.reply('The Joker is loose!');
                } else {
                        return interaction.reply('The Joker is in Arkham Asylum.');
                }
        }

        if (interaction.commandName === 'gcpd') {
                const gcpdEmbed = new EmbedBuilder()
                    .setTitle('GCPD\'s Most Wanted List')
                    .setDescription('A list of Gotham City\'s most notorious criminals.')
                    .setColor('#FF0000');

                    mostWantedList.forEach((criminal) => {
                        gcpdEmbed.addFields(
                          { name: `${criminal.rank} ${criminal.name} (${criminal.alias})`, value: `${criminal.description}` }
                        );
                      });
                  
                      await interaction.reply({ embeds: [gcpdEmbed] });
                }
                
        if (interaction.commandName === 'riddle') {
            const randomRiddle = riddlesArray[Math.floor(Math.random() * riddlesArray.length)];
                      await interaction.reply(`🤔 Riddle me this: ${randomRiddle}`);
                    
        }
    });

    


client.on('ready', (c) => {
        console.log(`✅ ${c.user.tag} is online.`);

        client.user.setActivity({
                name: 'Lego Batman'
        })
});

client.login(process.env.TOKEN);
