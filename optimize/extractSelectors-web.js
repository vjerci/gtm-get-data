const { getGTMData, constructURL, fetchSelectors } = require('../util');
const { fetchText, configTool } = require('./../env-web');

const currentUrl = document.currentScript.src;
const { gtmID, gaCID, previousGTM } = configTool(currentUrl);

async function getIt() {
        const data = await getGTMData(fetchText, constructURL(gtmID, gaCID, previousGTM));
        const resource = data.resource;

        const targetExp =
            resource.tags
                .find((tag) => tag.vtp_variant == variant && tag.vtp_measurementId == experimentId);

        if(!targetExp) {
            resource.tags.find(tag => {
                if (tag.vtp_variant) {
                    console.log(`found variant:${tag.vtp_variant} for experiment ${tag.vtp_measurementId}` )
                }
            });
        }

        const selectors = fetchSelectors(resource, [], targetExp);
        return selectors;
}


module.exports = getIt
