const { getGTMData, constructURL, fetchSelectors } = require('../util');
const { fetchText, configTool, baseGTMUrl } = require('./../env-web');

const currentUrl = document.currentScript.src;
const { gtmID, gaCID, previousGTM } = configTool(currentUrl);

async function getIt() {
        const data = await getGTMData(fetchText, constructURL(baseGTMUrl, gtmID, gaCID, previousGTM));
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

getIt.then(selectors => window.hackyOptimizeSelector = selectors).catch(e => console.log(e));
