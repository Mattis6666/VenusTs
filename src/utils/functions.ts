import Discord from 'discord.js';
import config from './config';
import { Response } from 'node-fetch';

export default {
    newEmbed(timestamp = false) {
        return timestamp ? new Discord.MessageEmbed().setColor('RANDOM').setTimestamp() : new Discord.MessageEmbed().setColor('RANDOM');
    },
    async handleError(client: Discord.Client, err: Error) {
        console.error(err);
        const errorChannel = client.channels.cache.get(config.errorChannel) || (await client.channels.fetch(config.errorChannel));
        (errorChannel as Discord.TextChannel).send(
            config.developers.map(async (dev: string) => client.users.cache.get(dev) || (await client.users.fetch(dev))).join(' ') + '\n```' + err.stack + '```'
        );
    },
    handleResponse(response: Response) {
        return response.json().then(json => {
            return response.ok ? json : Promise.reject(json);
        });
    }
};
