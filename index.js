//orchestrator
const readLine = require('readline-sync')
const robots = {
    userInput: require('./robots/user-input.js'),
    text: require('./robots/text.js'),
}

async function start() {
    const content = {}
    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()

    content.userInput = robots.userInput(content.searchTerm)
    content.sourceContentOriginal = await robots.text(content)

    function askAndReturnSearchTerm() {
        return readLine.question('Type a Wikipedia search term: ')
    }

    function askAndReturnPrefix() {
        const prefixes = ['Who is', 'What is', 'The history of']
        const selectedPrefixIndex = readLine.keyInSelect(prefixes, 'Choose one option: ')
        const selectedPrefixText = prefixes[selectedPrefixIndex]

        return selectedPrefixText
    }

    console.log(content)
}

start()