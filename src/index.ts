import Discord from 'discord.js';
import config from '../config';

const client = new Discord.Client();

client.once('ready', () => {
    console.info('Logged in!');
});

client.on('message', message => {
    console.log(message.content);
});

client.login(config.TOKEN);
