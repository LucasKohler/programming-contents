import ImportCSVService from './importCSVSercive'

class CitiesDistancesService {
  async execute([...cities]: string[], kmPrice: number) {
    if(kmPrice == 0 || !Number.isFinite(kmPrice)){
      return console.log('\nINFORME O CUSTO POR KM ANTES!!!')
    }

    const importCSV = new ImportCSVService()
    const citiesDistances = await importCSV.execute()

    let origin = 0
    let destiny = 1
    let result = 0
    let km = 0
    let consoleString = ''

    console.log('\n')

    //Loop comparando as cidades no array cities com as cidades do arquivo CSV.
    while(origin < cities.length && destiny < cities.length) {
      let checker = false
      citiesDistances.forEach(city => {
        if(city.name === cities[origin]){
          km = city.distances[`${(cities[destiny]).replace(/\s/g, '_')}`]
          result += km
          checker = true
          consoleString += `${cities[origin]} -> ${cities[destiny]} (${km}) KM\n`
        }
      })
      //Verificando se as cidades vindas por argumento existem no arquivo CSV.
      if (!checker){
        console.log(`A cidade ${cities[origin]} é inválida!!!`)
        return
      } else if (Number.isNaN(result)) {
        console.log(`A cidade de ${cities[destiny]} é inválida!!!`)
        return
      }
      origin++
      destiny++
    }
    
    console.log(consoleString)
    console.log(`Distancia total : ${result} km`)
    console.log(`O custo total foi de: ${(result*kmPrice).toFixed(1)} R$`)
    console.log(`Litros de gasolina consumidos: ${(result*2.57).toFixed(1)}`)
    console.log(`Duracao da viagem: ${(result/283).toFixed(1)} dias`)
  }
}

export default CitiesDistancesService