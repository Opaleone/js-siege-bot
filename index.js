const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

process.on("uncaughtException", (e) => {
	const curTimeDate = new Date().toJSON();
	const msg = `${curTimeDate}: ${e.message} ::index.js::\n`;

	fs.appendFile('errors.log', msg, (e) => {
		if (e) console.error(e)
	})
	if (e.message.includes("handshake")) {
			process.exit(1);
	}
});

process.on("unhandledRejection", (e, promise) => {
	const curTimeDate = new Date().toJSON();
	const msg = `${curTimeDate}: ${e.message} ::index.js::\n`;

	fs.appendFile('errors.log', msg, (e) => {
		if (e) console.error(e)
	})
	if (e.message && e.message.includes("handshake")) {
			process.exit(1);
	}
});

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions
  ] 
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, './src/commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, './src/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('messageCreate', async (message) => {
	try {	
		console.log('Working')
	} catch (e) {
		const curTimeDate = new Date().toJSON();
		const msg = `${curTimeDate}: ${e.message} ::index.js::\n`;

		fs.appendFile('errors.log', msg, (err) => {
			if (err) console.error(err)
		})
	}
});

client.login(config.token);

utils.hawkeyeConnect();