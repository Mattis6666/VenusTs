import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import util from '../../utils/Util';
import { getGuild } from '../../database/mongo';

const callback = async (message: Message, args: string[]) => {
    if (!message.guild) return;
    const member = await util.getMember(message, args);
    if (!member) return;
    const reason = args.length > 1 ? args.splice(1).join(' ') : 'No reason provided';
    const guildSettings = await getGuild(message.guild.id);
    await guildSettings.createWarn(message, member.user.id, reason);
    guildSettings.save();
    const output = util
        .newEmbed()
        .setTitle('Warn')
        .setDescription(`${member} has successfully been warned.`)
        .addFields([
            { name: 'Member', value: member.user.tag },
            { name: 'Moderator', value: message.author.tag },
            { name: 'Reason', value: reason }
        ])
        .setThumbnail(member.user.displayAvatarURL({ size: 256, dynamic: true }));
    return message.channel.send(output);
};

export const command: Command = {
    name: 'warn',
    category: '',
    aliases: [],
    description: '',
    usage: '',
    developerOnly: true,
    requiresArgs: 1,
    guildOnly: true,
    dmOnly: false,
    userPermissions: '',
    botPermissions: '',
    modOnly: true,
    adminOnly: false,
    callback: callback
};
