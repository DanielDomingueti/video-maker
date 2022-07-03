const fetch = require('cross-fetch')

function robot(content) {
    fetchContentFromWikipedia(content)
    //   sanitizeContent(content)
    //  breakContentIntoSentences(content)
}

function fetchContentFromWikipedia(content) {

    let url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=rome&explaintext&format=json`;

    let settings = {
        // mode: 'no-cors',
        method: 'GET',
        headers: { 'Content-Type':'application/json' }
    }

    fetch(url, settings)
        .then(response => {
            if (response != null) {
                response.json().then(json => {
                    console.log(json.query.pages)
                })
            }
        })
        

}

module.exports = robot