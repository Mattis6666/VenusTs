import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import VenClient from '../../interfaces/Client';

const callback = (message: Message, args: string[]) => {
    const client = message.client as VenClient;
    client;
    args;
    return;
};

export const command: Command = {
    name: 'example',
    category: 'DEVELOPMENT',
    aliases: [],
    description: '',
    usage: '',
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
