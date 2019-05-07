module.exports = {
    getGTMData,
    constructURL,
    fetchSelectors
};

function constructURL(gtmID, gaCID, previousGTM) {
    const url = new URL('https://www.googletagmanager.com/gtm.js');
    url.searchParams.append('id', gtmID);
    if (gaCID) {
        url.searchParams.append('cid', gaCID);
    }
    if(previousGTM) {
        url.searchParams.append('gtm', '1');
    }

    return url.toString();
}



async function getGTMData(fetchText, stringifiedURL) {
    const text = await fetchText(stringifiedURL);

    const start = text.indexOf('var data = {');
    const end = text.indexOf('};', start);

    const fullData = text.substring(start, end+2);

    return (function (){
        eval(fullData);
        return data;
    })();
}

function fetchSelectors(resource, selectors, currentTag){
    if (!currentTag.teardown_tags) {
        return selectors;
    }
    const selector = currentTag.vtp_selector;
    if (selector) {
        selectors.push(selector);
    } else if(selectors.length !== 0) {
        console.log('wtf script unsafe.... selector not found', currentTag);
    }

    const nextId = currentTag.teardown_tags[1][1];
    const nextTag = resource.tags[nextId];
    return fetchSelectors(resource, selectors, nextTag);
}
