const fetch = require('cross-fetch')

async function robot(content) {

    //Return fetched value from wikipedia
    content.sourceContentOriginal = extractValueFromFetch(await fetchContentFromWikipedia(content.searchTerm))
    sanitizeContent(content)
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

function sanitizeContent(content) {
    const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
    const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)
    console.log(withoutDatesInParentheses)

    function removeBlankLinesAndMarkdown(text) {
        const allLines = text.split('\n')
    
        const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
            if (line.trim().length === 0 || line.trim().startsWith('=')) {
                return false
            }
            return true
        })
        //Get everything together and separate it with a blank space.
        return withoutBlankLinesAndMarkdown.join(' ')
    }

    function removeDatesInParentheses(text) {
        return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
    }

}

function extractValueFromFetch(returnedFetchContent) {
    const parsedJson = JSON.parse(returnedFetchContent)
    const key = Object.keys(parsedJson)[0]
    const { extract } = parsedJson[key]
    return extract
}

module.exports = robot