import VenClient from '../interfaces/Client';
import { logInfo } from '../utils/winston';
import config from '../utils/config';

export default (client: VenClient) => {
    logInfo(`Connected to Discord as ${client.user!.tag} - ${client.user!.id}`);
    logInfo(`Serving ${client.guilds.cache.size} guilds and ${client.channels.cache.size} channels.`);
    logInfo(`Default prefix: ${config.defaultPrefix}`);
};
