//this is uploaded it should 
const { Client,  Intents } = require('discord.js');
//require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

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

	}else if (commandName === 'freeroamevent') {
		//let obj = await fetch("https://madam-nazar-location-api.herokuapp.com/location/current");
		//const myurl = await obj.json();

		let obj = await fetch('https://api.rdo.gg/fme/');
		let theurl = await obj.json();
		var today = new Date();
		let intlDateObj = new Intl.DateTimeFormat('en-GB', {
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			timeZone: "GMT"
		});
		var GMT = intlDateObj.format(today);
		//var timeGMT = time.;
		let theurlthemed = await theurl.themed;
		let theurldefault = await theurl.default;
		let mainurl = Object.assign(theurlthemed, theurldefault);
		console.log(mainurl);
		var keys = Object.keys(mainurl);
		var EventTimeZero = Date.parse('01 Jan 1970 ' + keys[2] + ':00 GMT');
		var TimeZero = Date.parse('01 Jan 1970 ' + GMT + ':00 GMT');
		//console.log(EventTimeZero - TimeZero);
		var Nextevent;
		var timeleft = 0;
		var count = 0;
		for (x in mainurl) {
			count++;
		}
		for (var i = 0; i < count; i++) {

			var EventTime = Date.parse('01 Jan 1970 ' + keys[i] + ':00 GMT');

			if ((EventTime - TimeZero) > 0) {

				if (timeleft == 0) {
					timeleft = (EventTime - TimeZero);
					Nextevent = keys[i];
				}
				if ((EventTime - TimeZero) < timeleft) {
					Nextevent = keys[i];
					timeleft = (EventTime - TimeZero);
					console.log(timeleft + " in if");
				}
			}
		}
		var timetime = new Date(timeleft);
		// Minutes part from the timestamp
		var minutes = " " + timetime.getMinutes();
		// Seconds part from the timestamp
		var seconds = " " + timetime.getSeconds();
		console.log("there is " + minutes + " and " + seconds + " sec");
		if (mainurl[Nextevent])

			if (mainurl[Nextevent].variation) {
				var variation = mainurl[Nextevent].variation.replaceAll('_', ' ');
				if (variation.includes("role")) {
				var variation1 = mainurl[Nextevent].variation.replaceAll('role', '');
					var s2 = variation1.substring(3);
				await interaction.reply(s2 + " in " + minutes + " min and " + seconds + " sec");
				}
				if (variation.includes("challenge")) {
				
				var variation1 = mainurl[Nextevent].variation.replaceAll('challenge', '');
					var s2 = variation1.substring(3);
				await interaction.reply(s2 + " in " + minutes + " min and " + seconds + " sec");
				}
				var s2 = variation.substring(3);
				await interaction.reply(s2 + " in " + minutes + " min and " + seconds + " sec");
			}
			else {
				var variation = mainurl[Nextevent].name.replaceAll('_', ' ');
				
				if (variation.includes("role")) {
				var variation1 = mainurl[Nextevent].name.replaceAll('role', '');
					var s2 = variation1.substring(3);
				await interaction.reply(s2 + " in " + minutes + " min and " + seconds + " sec");}
				var s2 = variation.substring(3);
				await interaction.reply(s2 + " in " + minutes + " min and " + seconds + " sec");
			}
	} else if (commandName === 'snowman') {
		await interaction.reply('Snowman loves GG the most, go away lady!!!!!!');
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
