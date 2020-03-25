import { Collection, Client } from 'discord.js';
import config from '../../config';
import Command from './Command';

export default class VenClient {
    Discord: Client = new Client({
        disableMentions: 'everyone',
        presence: {
            activity: {
                name: `${config.defaultPrefix}help`,
                type: 'LISTENING'
            }
        }
    });
    commands: Collection<string, Command> = new Collection();
    prefixes: Collection<string, string> = new Collection();
}
