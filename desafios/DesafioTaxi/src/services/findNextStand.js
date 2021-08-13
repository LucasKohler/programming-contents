const importCSVService = require('./importCSVService')
const calculateDistance = require('../utils/calculateDistance')


module.exports = class FindNextSTand {
  async execute(location) {
    //Verificação da variável location
    if (location === 'undefined' || location === null) {
      return console.log('informe a latitude e a longitude primeiro!')
    }

    if (location[0] === 0 && location[1] === 0) {
      return console.log('informe a latitude e a longitude primeiro!')
    }

    const importCSV = new importCSVService
    const pontos_taxi = await importCSV.execute()

    //Inclusão da propriedade distance no objeto dos pontos de taxi
    const pontosTaxiComDistancia = pontos_taxi.map(ponto => ({
      data_extracao: ponto.data_extracao,
      codigo: ponto.codigo,
      nome: ponto.nome,
      telefone: ponto.telefone,
      logradouro: ponto.logradouro,
      numero: ponto.numero,
      latitude: ponto.latitude,
      longitude: ponto.longitude,
      distance: calculateDistance(location, [ponto.latitude, ponto.longitude])
    }))

    // Verificando os pontos mais pertos
    const nextStands = pontosTaxiComDistancia.reduce((stands, stand) => {
      if ( stands.first.distance > stand.distance ) {
        stands.first = stand
      } else if ( stands.second.distance > stand.distance ) {
        stands.second = stand
      } else if ( stands.third.distance > stand.distance ) {
        stands.third = stand
      }

      return stands
    }, {first: pontosTaxiComDistancia[0],
        second: pontosTaxiComDistancia[1],
        third: pontosTaxiComDistancia[2]
      })

      // Verificando se o dado de entrada era compatível para o cálculo da distancia
      if ( Number.isNaN(nextStands.first.distance) || Number.isNaN(nextStands.second.distance) || Number.isNaN(nextStands.third.distance) ) {
        return console.log('\nNão foi possível calcular os pontos, verifique os dados de entrada da latitude e longitude!')
      }

      console.log('\n\nPontos mais próximos:')
      console.log(`1 - ${nextStands.first.nome}, ${nextStands.first.numero}: ${nextStands.first.distance}KM`)
      console.log(`2 - ${nextStands.second.nome}, ${nextStands.second.numero}: ${nextStands.second.distance}KM`)
      console.log(`3 - ${nextStands.third.nome}, ${nextStands.third.numero}: ${nextStands.third.distance}KM\n`)
  }
}