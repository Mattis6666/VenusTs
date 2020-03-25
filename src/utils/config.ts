function getConfig() {
    if (process.env.NODE_ENV === 'production') return require('../../config').default;
    else return require('../../devconfig').default;
}

export default getConfig();
