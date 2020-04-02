import VenClient from '../interfaces/Client';
import { logInfo } from '../utils/winston';
import config from '../utils/config';

export default (client: VenClient) => {
    logInfo(`Successfully logged in as ${client.user!.tag} - ${client.user!.id}`);
    logInfo(`Serving ${client.guilds.cache.size} guilds.`);
    logInfo(`Default prefix: ${config.defaultPrefix}`);
};
