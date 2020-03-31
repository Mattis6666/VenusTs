import { Message, TextChannel, MessageEmbed, Client } from 'discord.js';
import config from './config';
import nodeFetch, { RequestInfo, RequestInit } from 'node-fetch';

export const newEmbed = (timestamp: boolean = false) => {
    return timestamp ? new MessageEmbed().setColor('RANDOM').setTimestamp() : new MessageEmbed().setColor('RANDOM');
};

export const clean = (text: string) => {
    if (typeof text === 'string') {
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    } else return text;
};

export const handleError = async (client: Client, err: Error) => {
    console.error(err);
    const errorChannel = client.channels.cache.get(config.errorChannel) || (await client.channels.fetch(config.errorChannel));
    (errorChannel as TextChannel).send(
        config.developers.map(async (dev: string) => client.users.cache.get(dev) || (await client.users.fetch(dev))).join(' ') + '\n```' + err.stack + '```'
    );
};

export const fetch = async (RequestInfo: RequestInfo, requestOptions?: RequestInit) => {
    const result = await nodeFetch(RequestInfo, requestOptions)
        .then(response => {
            return response.json().then(json => {
                return response.ok ? json : Promise.reject(json);
            });
        })
        .catch(console.error);
    return result;
};

export const wrongSyntax = async (message: Message, text: string) => {
    if (!message.guild) return;
    const msg = await message.channel.send(text);
    msg.delete({ timeout: 1000 * 10 });
    message.delete({ timeout: 1000 * 10 });
};

export const numToMonth = (num: number) => {
    if (num > 11 || num < 0) throw new RangeError('Invalid month, baka.');
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][num];
};

export const nicerDates = (date: Date) => {
    return `${numToMonth(date.getMonth())} ${date.getDate()} ${date.getFullYear()}`;
};
