import { sendImage } from '../../utils/nekos';
import Command from '../../interfaces/Command';
import { Message } from 'discord.js';

const callback = (message: Message, args: string[]) => {
    return sendImage(message, args, 'foxGirl', '{{USER}} shows you this cute foxgirl, {{MEMBER}}!');
};

export const command: Command = {
    name: 'foxgirl',
    category: 'ANIME',
    aliases: [],
    description: 'Get a random cuddle image.',
    extended: '',
    usage: '[user]',
    developerOnly: false,
    guildOnly: false,
    dmOnly: false,
    requiresArgs: 0,
    userPermissions: '',
    botPermissions: '',
    modOnly: false,
    adminOnly: false,
    callback: callback
};
