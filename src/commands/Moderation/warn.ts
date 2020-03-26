import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
//import functions from '../../utils/functions';
import { getGuild } from '../../database/mongo';

const callback = async (message: Message, args: string[]) => {
    const [user, ...reason] = args;
    const guildSettings = await getGuild(message.guild!.id);
    const warn = await guildSettings.createWarn(message, user, reason.join(' '));
    guildSettings.save();
    console.log(warn);
};

export const command: Command = {
    name: 'warn',
    description: '',
    usage: '',
    developerOnly: true,
    requiresArgs: true,
    guildOnly: true,
    dmOnly: false,
    userPermissions: [],
    botPermissions: [],
    allowedRoles: [],
    callback: callback
};
