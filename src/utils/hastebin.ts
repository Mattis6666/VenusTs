import hastebin from 'hastebin';

export const uploadHaste = async (text: string) => {
    const url = await hastebin
        .createPaste(text, {
            raw: false,
            contentType: true
        })
        .catch(console.error);
    return url;
};
