const { getGTMData, constructURL } = require('./util');

const { configTool, fetchText } = require('./env-web');

const currentUrl = document.currentScript.src;
const { gtmID, gaCID, previousGTM } = configTool(currentUrl);

module.exports = async function proxyGTMData(config) {
    return await getGTMData(fetchText, constructURL(gtmID, gaCID, previousGTM));
}

