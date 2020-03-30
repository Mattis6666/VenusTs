import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import Util from '../../utils/Util';
//import util from '../../utils/Util';

const callback = (message: Message, args: string[]) => {
    const regex = /<?(a)?:?(\w{2,32}):(\d{17,19})>?/g;
    const emotes = args.join(' ').match(regex);
    if (!emotes) return Util.wrongSyntax(message, 'You did not provide any emotes! Please provide ');

    const emoteLinks = emotes.map(
        e => `<https://cdn.discordapp.com/emojis/${e.slice(e.lastIndexOf(':') + 1, e.lastIndexOf('>'))}${e.startsWith('<a') ? '.gif' : '.png'}>`
    );
    return message.channel.send(emoteLinks.join('\n'));
};

export const command: Command = {
    name: 'emote',
    category: 'DEVELOPMENT',
    aliases: ['emoji'],
    description: '',
    usage: '',
    developerOnly: false,
    guildOnly: false,
    dmOnly: false,
    requiresArgs: 1,
    userPermissions: '',
    botPermissions: '',
    modOnly: false,
    adminOnly: false,
    callback: callback
};
