import Config from './src/interfaces/Config';

export const config: Config = {
    token: process.env.TOKEN!,
    mongoString: process.env.MONGO!,
    defaultPrefix: 'v!',
    developers: ['265560538937819137'],
    errorChannel: '678271151054782484',
    imageChannel: '',
    apiKeys: {
        imgur: {
            id: process.env.IMGUR_ID!,
            secret: process.env.IMGUR_SECRET!
        }
    }
};
