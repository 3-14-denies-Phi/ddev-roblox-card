const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pang ping pang pung peng pong++'),
    async execute(interaction) {
        await interaction.reply(`[**PONG!**](<https://youtu.be/DgjCjzSRWCA>) <:badge:1456440637304864879>\n-# Oh, come on! way too common for a testing`);
    },
};