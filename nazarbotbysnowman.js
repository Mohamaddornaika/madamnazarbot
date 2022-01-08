const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Message, MessageAttachment, Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var http = require('http'); http.createServer(function (req, res) { res.write("I'm alive"); res.end(); }).listen(8080);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	snowman
	if (commandName === 'madamnazar') {
		let obj = await fetch("https://madam-nazar-location-api.herokuapp.com/location/current");
		const myurl = await obj.json();
		let theurl = await myurl.data.location.image;

		interaction.reply(theurl)

	} else if (commandName === 'snowman') {
		await interaction.reply('Snowman loves GG, the most go away lady!!!!!!');
	}
	else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

client.login(token);