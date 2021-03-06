import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import { getMember } from '../../utils/getters';
import { isMemberHigher } from '../../utils/checks';
import { wrongSyntax, newEmbed, trimString } from '../../utils/Util';

const callback = async (message: Message, args: string[]) => {
    if (!message.guild || !message.member) return;
    const member = await getMember(message, args);
    if (!member) return;
    if (!isMemberHigher(message.member, member)) return wrongSyntax(message, 'You cannot kick this user, because your highest role is not higher than theirs.');
    if (!member.kickable) return wrongSyntax(message, 'I am unable to kick this user. This is most likely because their role is higher than mine.');

    const m = await message.channel.send(`Do you really want to kick ${member.user.tag}?\nPlease respond with \`yes\` or \`no\``);
    let confirmed = false;
    const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, { time: 15 * 1000 });

    collector.on('collect', async (msg: Message) => {
        if (msg.content.toLowerCase() === 'yes' || msg.content.toLowerCase() === 'y') {
            const reason = args.slice(1).join(' ') || 'No reason provided.';
            const output = newEmbed(true)
                .setTitle('Kick')
                .setDescription(`You have been kicked from ${message.guild!.name}! 👢`)
                .addFields([
                    { name: 'User', value: member.user.tag },
                    { name: 'Moderator', value: message.author.tag },
                    { name: 'Reason', value: trimString(reason, 1024) }
                ]);

            await member.send(output).catch(() => null);
            member.kick(`Kicked by ${message.author.tag}: ${reason}}`);

            msg.delete({ timeout: 10 * 1000 });
            m.delete({ timeout: 10 * 1000 });

            confirmed = true;
            collector.stop();

            return message.channel.send(output.setDescription('User has been kicked! 👢'));
        } else if (msg.content.toLowerCase() === 'no' || msg.content.toLowerCase() === 'n') {
            msg.delete({ timeout: 10 * 1000 });
            m.delete({ timeout: 10 * 1000 });

            confirmed = true;
            collector.stop();

            return wrongSyntax(message, 'Kick has been cancelled!');
        } else {
            return wrongSyntax(msg, 'Invalid response! Please only respond with `yes` or `no`!');
        }
    });

    collector.on('end', () => {
        if (!confirmed) wrongSyntax(message, 'You did not respond in time. Please run the command again.');
        return;
    });
};

export const command: Command = {
    name: 'kick',
    category: 'MODERATION',
    aliases: ['boot', 'k'],
    description: 'kick a user',
    usage: '<User (Mention, ID or name)> [reason]',
    developerOnly: false,
    guildOnly: true,
    dmOnly: false,
    requiresArgs: 1,
    userPermissions: 'KICK_MEMBERS',
    botPermissions: 'KICK_MEMBERS',
    modOnly: true,
    adminOnly: false,
    callback: callback
};
