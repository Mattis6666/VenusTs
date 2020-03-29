import { sendImage } from '../../utils/nekos';
import Command from '../../interfaces/Command';
import { Message } from 'discord.js';

const callback = (message: Message, args: string[]) => {
    return sendImage(message, args, 'smug', '{{USER}} gives you a smug look, image.{{MEMBER}}!');
};

export const command: Command = {
    name: 'smug',
    category: 'ANIME',
    aliases: [],
    description: 'Get a random smug image.',
    extended: 'To give your friend a smug look, pass along their name or mention!',
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
