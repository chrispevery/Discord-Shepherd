const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!')
})

client.on('message', message => {
	//console.log(message.content);

	if (message.content.startsWith('${prefix}addChannel')) {
		message.channel.send("Creating Channel");
	}
})

client.login(token);
