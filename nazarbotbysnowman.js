//wats wrong?
const { Client,  Intents } = require('discord.js');
require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var http = require("http");
  setInterval(function() {
    http.get("http://<your app name>.herokuapp.com");
}, 300000); // every 5 minutes (300000)
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	if (commandName === 'madamnazar') {
		let obj = await fetch("https://madam-nazar-location-api.herokuapp.com/location/current");
		const myurl = await obj.json();
		let theurl = await myurl.data.location.image;

		interaction.reply(theurl)

	} else if (commandName === 'snowman') {
		await interaction.reply('Snowman loves GG, the most go away lady!!!!!!');
	} else if (commandName === 'Fam') {
		await interaction.reply('Fam_Rude the Noopest of all Noops!!!!!!');
	}
	else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

client.login(process.env.DISCORD_TOKEN);
