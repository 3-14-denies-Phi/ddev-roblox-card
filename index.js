require('dotenv').config();
const { Client, GatewayIntentBits, Collection, MessageFlags } = require('discord.js');
const { loadCommands } = require('./handler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

client.once('clientReady', () => {
    console.log(`[ App     ] ${client.user.tag} born for this`);
    loadCommands(client);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'Things go wrong, im sorry... retry again', flags: MessageFlags.Ephemeral });
        } else {
            await interaction.reply({ content: 'Things go wrong, im sorry... retry again', flags: MessageFlags.Ephemeral });
        }
    }
});

client.login(process.env.TOKEN);