import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
//import functions from '../../utils/functions';

const callback = (message: Message, args: string[]) => {
    args;
    return message.channel.send('');
};

export const command: Command = {
    name: 'example',
    description: '',
    usage: '',
    developerOnly: true,
    requiresArgs: true,
    guildOnly: false,
    dmOnly: false,
    userPermissions: [],
    botPermissions: [],
    allowedRoles: [],
    callback: callback
};
