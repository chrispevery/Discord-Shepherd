const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const { prefix, token } = require('./config.json');
const botnames = ["bot", "robot", "computer"];
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
};

client.once('ready', () => {
	console.log('Ready!')
})

client.on('message', message => {
	console.log(message.content);
	const withoutPrefix = message.content.slice(config.prefix.length);
	const split = withoutPrefix.split(/ +/);
	const command = split[0];
	const args = split.slice(1);

	if (message.content.startsWith(prefix + 'addChannel')) {
		message.channel.send("Creating Channel");
	}

	if (message.content === (prefix + 'roll')) {
    var roll = Math.floor(Math.random() * 10) + 1;
		message.reply(`you rolled ${roll}`);
	}

    if (message.content.toLowerCase() == "hi shepherd") {
        message.channel.send(`Hi ${message.author}`);
    }

	if (message.content.toLowerCase() == "shepherd is a bot") {
		message.channel.send(`${message.author} I'm a human, I'm not a bot`);
	}



if (command === 'avatar') {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention if you want to see someone elses avatar.');
		}

		return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
	}

	return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
}
});

function getUserFromMention(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/^<@!?(\d+)>$/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return;

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return client.users.cache.get(id);
};


client.login(token);
