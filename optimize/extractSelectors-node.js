const { getGTMData, constructURL, fetchSelectors } = require('../util');
const { fetchText, config: { gtmID, experimentId, variant, baseGTMUrl } } = require('../env-node');

getIt().then((data) => console.log(data));

async function getIt() {
    let gotIt;

    do {
        const data = await getGTMData(fetchText, constructURL(baseGTMUrl, gtmID));
        const resource = data.resource;

        const targetExp =
            resource.tags
                .find((tag) => tag.vtp_variant == variant && tag.vtp_measurementId == experimentId);

        if(!targetExp) {
            console.log('retrying to fetch');
            resource.tags.find(tag => {
                if (tag.vtp_variant) {
                    console.log(`found variant:${tag.vtp_variant} for experiment ${tag.vtp_measurementId}` )
                }
            });

            continue
        }

        const selectors = fetchSelectors(resource, [], targetExp);

        return selectors;

    } while(!gotIt);
}

