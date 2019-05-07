const { getGTMData, constructURL } = require('./util');

const { configTool, fetchText } = require('./env-web');

const currentUrl = document.currentScript.src;
const { gtmID, gaCID, previousGTM } = configTool(currentUrl);


getGTMData(fetchText, constructURL(gtmID, gaCID, previousGTM))
    .then(data => window.hackyGTMdata = data)
    .catch(e => console.log(e));

