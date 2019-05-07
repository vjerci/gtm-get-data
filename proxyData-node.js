
const { getGTMData, constructURL } = require('./util');
const { fetchText, config } = require('./env-node');

getGTMData(fetchText, constructURL(config.gtmID))
    .then((data) => console.log(data))
    .catch(e => console.log(e));




