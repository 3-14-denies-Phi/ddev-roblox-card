const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');

async function loadCommands(client) {
    const commands = [];
    const foldersPath = path.join(__dirname, 'commands');
    if (!fs.existsSync(foldersPath)) { fs.mkdirSync(foldersPath); }
    const commandFolders = fs.readdirSync(foldersPath);
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        if (fs.statSync(commandsPath).isDirectory()) {
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                if ('data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                    commands.push(command.data.toJSON());
                } else {
                    console.log(`Well well well, look at ${filePath} it's missing a required "data" or "execute" property`);
                }
            }
        }
    }
    const rest = new REST().setToken(process.env.TOKEN);
    try {
        console.log(`[ Loading ] ${commands.length} commands`);
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );
        console.log(`[ Loaded  ] ${data.length} commands`);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { loadCommands };