import fs from 'fs';
import { Message } from 'discord.js';
import config from '../config';
import Client from './types/Client';
import Command from './types/Command';

const VenClient = new Client();
const client = VenClient.Discord;

fs.readdirSync(__dirname + '/commands/').forEach(folder => {
    const commandFiles = fs.readdirSync(__dirname + `/commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command: Command = require(__dirname + `/commands/${folder}/${file}`).command;
        if (!command.name) throw new Error('ERROR! INVALID COMMAND BODY: ' + file);
        VenClient.commands.set(command.name, command);
    }
});

client.once('ready', () => {
    console.info('Logged in!');
});

client.on('message', (message: Message) => {
    const guildPrefix = message.guild ? VenClient.prefixes.get(message.guild.id) : null;
    const prefixRegex = new RegExp(`^(<@!?${client.user!.id}>|${(guildPrefix || config.defaultPrefix).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const matched = message.content.match(prefixRegex);
    const prefix = matched ? matched[0] : null;
    if (!prefix || !message.content.startsWith(prefix)) return;

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(' ');
    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;
    console.log(args);
    const command = VenClient.commands.get(commandName);
    if (!command || !command.callback) return;

    command.callback(message, args);
});

client.login(config.token);

export default VenClient;
