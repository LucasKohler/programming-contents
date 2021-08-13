import ImportCSVService from './services/importCSVSercive'
import CityDistanceService from './services/cityDistanceService'
import CitiesDistanceService from './services/citiesDistancesService'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let kmPrice: number = 0

//Função principal para conseguir chamar a promise do csv-parse.
const mainExecute = async () => {
  const calculateDistance = new CityDistanceService()
  const calculateTrjatoryDistance = new CitiesDistanceService()

  const asyncReadline = () => {
    rl.question('\n=========================================\n'
    + '1. Consfigurar custo por KM\n'
    + '2. Consultar trecho\n'
    + '3. Consultar rota\n'
    + '4. Terminar o programa\n\n'
    + 'Selecione uma opção: '
    , line => {
      //Leitura do menu e chamada das classes service.
      switch (line){
        case '1':
          rl.question('Informe o custo por KM: ', answer => {
            kmPrice = parseFloat(answer)
            asyncReadline()
          })
          break;
  
        case '2':
          rl.question('Digite o nome da cidade de origem: ', origin => {
            rl.question('Digite o nome da cidade de destino: ', destiny => {
              calculateDistance.execute([origin.toLowerCase(), destiny.toLowerCase()], kmPrice).then(() => asyncReadline())
            })
          })
          break;
  
        case '3':
          rl.question('Digite o nome de duas ou mais cidades sepradas por virgula: ', trajetory =>{
            let array = trajetory.toLowerCase().split(',').map(value => {
              return value.trim()
            })
            calculateTrjatoryDistance.execute(array, kmPrice).then(() => asyncReadline())
          })
          break;
  
        //Fechamendo do readLine.  
        case '4':
          console.log('PROGRAMA ENCERRADO!!')
          return rl.close()
  
        default:
          console.log('\nOpção inválida, selecione outra por favor!\n')
    }
    asyncReadline()
    })
  }
  
  asyncReadline()
}

mainExecute()
