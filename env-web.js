
const configTool = (url) => {
    let params = (new URL(url)).searchParams;

    // gtm container id
    let gtmID = params.get("id");
    // google analytics client id
    let gaCID = params.get("cid");
    // flag is for telling gtm that current container is being requested by parent container
    let previousGTM = params.get("gtm");

    return {
        gtmID,
        gaCID,
        previousGTM
    }
}


let fetchText = async (url) => {
    const res = await fetch(url);
    return res.body;
};

const baseGTMUrl = 'https://crossorigin.me/https://www.googletagmanager.com/gtm.js';

module.exports = {
    fetchText,
    configTool,
    baseGTMUrl
}
