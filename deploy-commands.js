// Require the necessary discord.js classes wfsrdgthf
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

//const { clientId, guildId, } = require('./config.json');
require('dotenv').config();
console.log("this is running");
const commands = [
    new SlashCommandBuilder().setName('madamnazar').setDescription('Replies with madam nazar location!'),
    new SlashCommandBuilder().setName('snowman').setDescription('Wat snowman loves?'),
    new SlashCommandBuilder().setName('Fam').setDescription('Fam asshole the rudest rude!!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
    .map(command => command.toJSON());
// Create a new client instance

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
