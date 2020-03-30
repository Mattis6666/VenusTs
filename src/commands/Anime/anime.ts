import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import query from '../../constants/animeQuery';
import { fetch, wrongSyntax, newEmbed, numToMonth } from '../../utils/Util';

const callback = async (message: Message, args: string[]) => {
    const data = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            query: query,
            variables: {
                search: args.join(' '),
                page: 1,
                perPage: 1
            }
        })
    });

    const media = data.data.Page.media[0];
    if (!media) return wrongSyntax(message, "Sorry, I wasn't able to find an anime matching your Search Term.");
    if (media.isAdult) return wrongSyntax(message, "Sorry, this Anime can't be displayed, because it's NSFW!");

    const names = media.synonyms;
    if (media.title.english !== 'null' && media.title.english) names.push(media.title.english);
    if (media.title.native !== 'null' && media.title.native) names.push(media.title.native);

    const output = newEmbed(true)
        .setTitle(media.title.romaji || media.title.english || media.title.english)
        .setThumbnail(media.coverImage.extraLarge)
        .setImage(media.bannerImage)
        .setDescription(`${media.description.replace(/<[^>]*>/gi, '')}\n[More Info can be found here!](${media.siteUrl})`)
        .addField('Other Names', names.join('\n') || '-')
        .addField('Genres', media.genres.join(', ') || '-')
        .addField('Status', media.status || '-', true)
        .addField('Average Rating', media.averageScore ? media.averageScore + '%' : '-', true)
        .addField('Format', media.format || '-', true)
        .addField('Episodes/Chapters', media.episodes || media.chapters || '-', true)
        .addField('Started on', `${numToMonth(media.startDate.month)} ${media.startDate.day} ${media.startDate.year}`, true)
        .addField('Finished on', media.endDate.month ? `${numToMonth(media.endDate.month)} ${media.endDate.day} ${media.endDate.year}` : '-', true);
    return message.channel.send(output);
};

export const command: Command = {
    name: 'anime',
    category: 'ANIME',
    aliases: ['manga', 'ani'],
    description: 'Look up your favourite Anime or Manga!',
    usage: '[Anime Name]',
    developerOnly: false,
    guildOnly: false,
    dmOnly: false,
    requiresArgs: 1,
    userPermissions: '',
    botPermissions: '',
    modOnly: false,
    adminOnly: false,
    callback: callback
};
