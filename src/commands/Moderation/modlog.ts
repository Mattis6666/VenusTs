import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import util from '../../utils/Util';
import { getGuild } from '../../database/mongo';

const callback = async (message: Message, args: string[]) => {
    if (!message.guild) return;
    const guildSettings = await getGuild(message.guild.id);
    const output = util.newEmbed(true);

    if (!args.length) {
        const modLog = guildSettings.modLog.find(ele => ele.userId === message.author.id);
        if (!modLog || !modLog.warns.length) return message.channel.send(`You do not have any mod-log entries, ${message.author.username}.`);

        output
            .setTitle('ModLog for ' + message.author.tag)
            .setThumbnail(message.author.displayAvatarURL({ size: 256, dynamic: true }))
            .addFields(
                modLog.warns.map(warn => {
                    return { name: `Moderator: ${warn.moderator.username} ~ ${util.nicerDates(warn.date)}`, value: warn.reason };
                })
            );
        return message.channel.send(output);
    }

    const member = await util.getMember(message, args);
    if (!member) return;

    const modLog = guildSettings.modLog.find(ele => ele.userId === member.id);
    if (!modLog || !modLog.warns.length) return message.channel.send(`This user does not have any mod-log entries, ${message.author.username}.`);

    output
        .setTitle('ModLog for ' + member.user.tag)
        .setThumbnail(member.user.displayAvatarURL({ size: 256, dynamic: true }))
        .addFields(
            modLog.warns.map(warn => {
                return { name: `Moderator: ${warn.moderator.username} ~ ${util.nicerDates(warn.date)}`, value: warn.reason };
            })
        );
    return message.channel.send(output);
};

export const command: Command = {
    name: 'modlog',
    category: 'MODERATION',
    aliases: [],
    description: '',
    usage: '',
    developerOnly: true,
    requiresArgs: 0,
    guildOnly: true,
    dmOnly: false,
    userPermissions: '',
    botPermissions: '',
    modOnly: false,
    adminOnly: false,
    callback: callback
};
