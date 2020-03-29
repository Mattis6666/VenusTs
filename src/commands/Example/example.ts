import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import VenClient from '../../interfaces/Client';
//import util from '../../utils/Util';

const callback = (message: Message, _args: string[]) => {
    const client = message.client as VenClient;
    client;
    return;
};

export const command: Command = {
    name: 'example',
    category: 'DEVELOPMENT',
    aliases: [],
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
