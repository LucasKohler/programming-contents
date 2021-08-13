const importCSVService = require('./importCSVService')

module.exports = class FindLogradouro {
  async execute(string) {
    if (!typeof string === 'string'){
      return console.log('FORMATO DE LOGRADOURO INVÁLIDO');
    }

    const logradouro = string.toUpperCase()
    const importCSV = new importCSVService()
    const pontos_taxi = await importCSV.execute()

    const pontosLogradouro = pontos_taxi.reduce((pontos, ponto) => {
      const iterableLogradouro = ponto.logradouro.split(" ")
      iterableLogradouro.forEach(string => {
        if (string === logradouro)
          pontos.push(ponto)
      })
      return pontos
    }, [])

    if (pontosLogradouro.length === 0) {
      return console.log('Não foi possível encontrar pontos de taxi no logradouro informado')
    }

    console.log('\nPontos de taxi encontrados:\n')
    pontosLogradouro.map(ponto => console.log(`${ponto.nome}, ${ponto.numero}`))
  }
}