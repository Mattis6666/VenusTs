import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import VenClient from '../../interfaces/Client';
//import functions from '../../utils/functions';

const callback = (message: Message, _args: string[]) => {
    const client = message.client as VenClient;
    client;
    return;
};

export const command: Command = {
    name: 'example',
    description: '',
    usage: '',
    developerOnly: true,
    guildOnly: false,
    dmOnly: false,
    requiresArgs: 0,
    userPermissions: '',
    botPermissions: '',
    modOnly: false,
    adminOnly: false,
    callback: callback
};
