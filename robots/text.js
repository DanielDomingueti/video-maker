const fetch = require('cross-fetch')

async function robot(content) {

    //Return fetched value from wikipedia
    return extractValueFromFetch(await fetchContentFromWikipedia(content.searchTerm))

    // sanitizeContent(content)
    // breakContentIntoSentences(content)
}

async function fetchContentFromWikipedia(value) {
    let url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=${value}&explaintext&format=json`;

    return fetch(url)
        .then((resp) => {
            return resp.json()
        })
        .then((data) => {
            return JSON.stringify(data.query.pages)
        })
}

function extractValueFromFetch(returnedFetchContent) {
    const parsedJson = JSON.parse(returnedFetchContent)
    const key = Object.keys(parsedJson)[0]
    const { extract } = parsedJson[key]
    return extract
}

module.exports = robot