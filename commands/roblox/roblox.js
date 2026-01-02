const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roblox')
        .setDescription('Get Roblox player information through card')
        .addStringOption(option =>
            option.setName("username")
                .setDescription("Put Roblox player's username")
                .setRequired(true)
        ),
    async execute(interaction) {
        // fill this later oki
    },
};