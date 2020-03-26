import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import fetch from 'node-fetch';
import functions from '../../utils/functions';

const callback = (message: Message, args: string[]) => {
    fetch('http://api.urbandictionary.com/v0/define?term=' + args.join('%20'))
        .then(functions.handleResponse)
        .then(data => {
            if (!data) return;
            data = data.list[0];
            const output = functions
                .newEmbed()
                .setTitle(data.word)
                .setURL(data.permalink)
                .setImage('https://wjlta.files.wordpress.com/2013/07/ud-logo.jpg')
                .setDescription(data.definition.replace(/(\[|\])/g, ''))
                .addField('Example', data.example.replace(/(\[|\])/g, ''))
                .setFooter(`👍 ${data.thumbs_up} | 👎 ${data.thumbs_down} | 👤 ${data.author} | 📆 ${data.written_on.replace(/T.+?Z/, '')}`);

            return message.channel.send(output);
        });
};

export const command: Command = {
    name: 'urban',
    description: 'urban',
    usage: '',
    developerOnly: false,
    requiresArgs: true,
    guildOnly: false,
    dmOnly: false,
    userPermissions: [],
    botPermissions: [],
    allowedRoles: [],
    callback: callback
};
