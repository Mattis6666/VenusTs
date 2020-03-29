import Util from './Util';

export const uploadHaste = async (text: string) => {
    const result = await Util.fetch('https://hasteb.in/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: text,
        redirect: 'follow'
    });
    return `https://hasteb.in/${result.key}`;
};
