import ImportCSVService from './importCSVSercive'

class CityDistanceService {
  async execute([...cities]: string[], kmPrice: number) {
    if(kmPrice == 0 || !Number.isFinite(kmPrice)){
      return console.log('\nINFORME O CUSTO POR KM ANTES!!!')
    }

    const importCSV = new ImportCSVService()
    const citiesDistances = await importCSV.execute()

    let origin = 0
    let destiny = 1
    let result = 0

    //Loop comparando as cidades no array cities com as cidades do arquivo CSV.
    while(origin < cities.length && destiny < cities.length) {
      let checker = false
      citiesDistances.forEach(city => {
        if(city.name === cities[origin]){
          result +=city.distances[`${(cities[destiny]).replace(/\s/g, '_')}`]
          checker = true
        }
      })
      //Verificando se as cidades vindas por argumento existem no arquivo CSV.
      if (!checker){
        console.log(`\nA cidade de ${cities[origin]} é inválida!!!`)
        return
      } else if (Number.isNaN(result)) {
        console.log(`\nA cidade de ${cities[destiny]} é inválida!!!`)
        return
      } 
      origin++
      destiny++
    }

    console.log(`\nDistancia entre ${cities.join(' e ')} é de ${result} km`)
    console.log(`O custo total foi de: ${(result*kmPrice).toFixed(1)} R$`)
  }
}

export default CityDistanceService