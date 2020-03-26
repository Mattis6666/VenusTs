import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import VenClient from '../../interfaces/Client';
import { getGuild } from '../../database/mongo';

const callback = async (message: Message, args: string[]) => {
    const client = message.client as VenClient;
    if (!message.guild) return;
    const prefix = args[0];
    const guildSettings = await getGuild(message.guild.id);
    console.log(guildSettings);
    if (!guildSettings) return;
    guildSettings.settings.prefix = prefix;
    await guildSettings.save();
    client.guildSettings.set(message.guild.id, guildSettings);
    return message.channel.send(`This guild's prefix has successfully been changed to \`${prefix}`);
};

export const command: Command = {
    name: 'setprefix',
    description: '',
    usage: '',
    developerOnly: true,
    requiresArgs: 1,
    guildOnly: false,
    dmOnly: false,
    userPermissions: 'MANAGE_GUILD',
    botPermissions: '',
    modOnly: true,
    adminOnly: true,
    callback: callback
};
