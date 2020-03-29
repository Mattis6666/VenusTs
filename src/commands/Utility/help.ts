import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import VenClient from '../../interfaces/Client';
import util from '../../utils/Util';
import config from '../../utils/config';

const callback = async (message: Message, args: string[]) => {
    const client = message.client as VenClient;
    const prefix = message.guild ? await util.getPrefix(client, message.guild.id) : config.defaultPrefix;
    const output = util.newEmbed(true);
    if (!args.length) {
        const commands: any = {
            DEVELOPMENT: [],
            MODERATION: [],
            SETTINGS: [],
            UTILITY: [],
            MISC: ['a'],
            FUN: ['a'],
            ANIME: []
        };
        client.commands.forEach(command => {
            const category = commands[command.category] || commands.MISC;
            category.push(`\`${prefix}${command.name}\` - *${command.description}*`);
        });
        output
            .setTitle('Help Menu')
            .setAuthor("Here's a list of all available commands!")
            .setFooter(`Type ${prefix}help [command name] to get info on a specific command`)
            .addFields([
                { name: 'Moderation', value: commands.MODERATION.join('\n') },
                { name: 'Settings', value: commands.SETTINGS.join('\n') },
                { name: 'Utility', value: commands.UTILITY.join('\n') },
                { name: 'Fun', value: commands.FUN.join('\n') },
                { name: 'Anime', value: commands.ANIME.join('\n') },
                { name: 'Miscellaneous', value: commands.MISC.join('\n') }
            ]);
        return message.channel.send(output);
    }

    const name = args[0].toLowerCase();
    const command = client.commands.get(name) || client.commands.find(c => c.aliases && c.aliases.includes(name));
    if (!command) return util.wrongSyntax(message, "That's not a valid command!");
    if (command.developerOnly && !config.developers.includes(message.author.id)) return;

    output.setAuthor(command.name.toUpperCase()).addFields([
        { name: 'Description', value: command.description || '-' },
        { name: 'Usage', value: `\`${prefix + command.name} ${command.usage || ''}\``, inline: true },
        { name: 'Aliases', value: command.aliases.join(', ') || '-', inline: true }
    ]);
    return message.channel.send(output);
};

export const command: Command = {
    name: 'help',
    category: 'UTILITY',
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
