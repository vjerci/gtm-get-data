
const { getGTMData, constructURL } = require('./util');
const { fetchText, config, baseGTMUrl } = require('./env-node');

getGTMData(fetchText, constructURL(baseGTMUrl, config.gtmID))
    .then((data) => console.log(data))
    .catch(e => console.log(e));




