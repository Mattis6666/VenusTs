import { Message, TextChannel, MessageEmbed, Client } from 'discord.js';
import config from './config';
import { Response } from 'node-fetch';

export default {
    newEmbed(timestamp: boolean = false) {
        return timestamp ? new MessageEmbed().setColor('RANDOM').setTimestamp() : new MessageEmbed().setColor('RANDOM');
    },
    clean(text: string) {
        if (typeof text === 'string') return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
        else return text;
    },
    async handleError(client: Client, err: Error) {
        console.error(err);
        const errorChannel = client.channels.cache.get(config.errorChannel) || (await client.channels.fetch(config.errorChannel));
        (errorChannel as TextChannel).send(
            config.developers.map(async (dev: string) => client.users.cache.get(dev) || (await client.users.fetch(dev))).join(' ') + '\n```' + err.stack + '```'
        );
    },
    handleResponse(response: Response) {
        return response.json().then(json => {
            return response.ok ? json : Promise.reject(json);
        });
    },
    async getMember(message: Message, args: string[]) {
        if (!message.guild) throw new SyntaxError('getMember was used in a DmChannel.');
        const member = message.mentions.members?.first() || message.guild.members.cache.get(args[0]);
        if (member) return member;

        const memberSearch = message.guild.members.cache.filter(member => member.displayName.toLowerCase().includes(args[0].toLowerCase()));
        if (memberSearch.size === 1) return memberSearch.first();
        if (!memberSearch.size) this.wrongSyntax(message, 'You did not provide a valid member. Please run the command again and provide one.');
        else if (memberSearch.size > 1)
            this.wrongSyntax(
                message,
                `I found multiple members matching your input: ${
                    memberSearch.size > 3 ? memberSearch.size : memberSearch.map(r => '`' + r.displayName + '`').join(', ')
                }`
            );
        else this.wrongSyntax(message, 'Sorry, something went wrong (>_<)');
        return null;
    },
    async getRole(message: Message, args: string[]) {
        if (!message.guild) throw new SyntaxError('getRole was used in a DmChannel.');
        const role = message.mentions.roles?.first() || message.guild.roles.cache.get(args[0]);
        if (role) return role;

        const roleSearch = message.guild?.roles.cache.filter(role => role.name.toLowerCase().includes(args[0].toLowerCase()));
        if (roleSearch.size === 1) return roleSearch.first();
        if (!roleSearch.size) this.wrongSyntax(message, 'You did not provide a valid role. Please run the command again and provide one.');
        else if (roleSearch.size > 1)
            this.wrongSyntax(
                message,
                `I found multiple roles matching your input: ${roleSearch.size > 3 ? roleSearch.size : roleSearch.map(r => '`' + r.name + '`').join(', ')}`
            );
        else this.wrongSyntax(message, 'Sorry, something went wrong (>_<)');
        return null;
    },
    async wrongSyntax(message: Message, text: string) {
        const msg = await message.channel.send(text);
        msg.delete({ timeout: 1000 * 10 });
        message.delete({ timeout: 1000 * 10 });
    },
    numToMonth(num: number) {
        if (num > 11 || num < 0) throw new RangeError('Invalid month, baka.');
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][num];
    },
    nicerDates(date: Date) {
        return `${this.numToMonth(date.getMonth())} ${date.getDate()} ${date.getFullYear()}`;
    }
};
