import { Collection, Client } from 'discord.js';
import Command from './Command';

export default class VenClient extends Client {
    commands: Collection<string, Command> = new Collection();
    guildSettings: Collection<string, object> = new Collection();
}
