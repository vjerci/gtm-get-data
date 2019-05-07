const nodeFetch = require('node-fetch');

const fetchText = async (url) => {
    const res = await nodeFetch(url);
    return await res.text();
}

const config = {
    gtmID: '', // google tag manager conntainer id
    // needed only for optimize
    experimentId: '', // experiment id got from optimize
    variant: '' // varaint we are targeting
}

const baseGTMURL = 'https://www.googletagmanager.com/gtm.js';

module.exports = {
    fetchText,
    config,
    baseGTMURL
}
