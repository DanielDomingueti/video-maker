function robot(value) {
    return `Recebi com sucesso o content: ${value}`
}

module.exports = robot

//async e await avisa o JS pra esperar a promisse terminar. await espera o retorno da promisse que vira do backend
//quando é async, ao dar return, não precisa colocar await, pq o return ja espera a promisse se resolver.