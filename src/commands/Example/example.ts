import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import VenClient from '../../interfaces/Client';
//import functions from '../../utils/functions';

const callback = (message: Message, args: string[]) => {
    const client = message.client as VenClient;
    client;
    args;
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
