import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import VenClient from '../../interfaces/Client';
import util from '../../utils/Util';

const callback = (message: Message, args: string[]) => {
    const client = message.client as VenClient;
    const output = util.newEmbed(true);
    if (!args.length) {
    }
    client;
    output;
};

export const command: Command = {
    name: 'help',
    category: '',
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
