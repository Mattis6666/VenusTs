import Config from './src/interfaces/Config';

export const config: Config = {
    token: process.env.TOKEN!,
    mongoString: process.env.MONGO!,
    defaultPrefix: 'v!',
    developers: ['265560538937819137'],
    errorChannel: '',
    imageChannel: '',
    apiKeys: {
        imgur: {
            id: process.env.IMGUR_ID!,
            secret: process.env.IMGUR_SECRET!
        }
    }
};
