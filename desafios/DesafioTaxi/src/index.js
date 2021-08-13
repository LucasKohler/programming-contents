const readline = require('readline')
const importCSVService = require('./services/importCSVService')
const findNextStandService = require('./services/findNextStand')
const findLogradouroService = require('./services/findLogradouro')

//configuração do readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

//Função principal para conseguir chamar a promise do csv-parse.
const mainExecute = async () => {
  // Instanciamento das classes service
  const importCSV = new importCSVService()
  const findNextStand = new findNextStandService()
  const findLogradouro = new findLogradouroService()

  let latitude = 0
  let longitude = 0

  const asyncReadline = () => {
    rl.question('=========================================\n'
    + '1. Listar todos os pontos de taxi\n'
    + '2. Informar minha localização\n'
    + '3. Encontrar pontos próximos\n'
    + '4. buscar pontos por logradouro\n'
    + '5. Terminar programa\n\n'
    + 'Selecione uma opção: '
    , async line => {
      //Leitura do menu e chamada das classes service.
      switch (line){
        case '1':
          const pontos_taxi = await importCSV.execute()
          console.log('\npontos de taxi disponíveis\n')
          pontos_taxi.map(ponto => console.log(`${ponto.nome}, ${ponto.numero}`))
          break;
  
        case '2':
          rl.question('Informe sua latitude: ', newLatitude => {
            rl.question('Informe sua longitude: ', newLongitude => {
              latitude = parseFloat(newLatitude.replace(',','.'))
              longitude = parseFloat(newLongitude.replace(',','.'))

              console.log('Localização armazendada\n')
              asyncReadline()
            })
          })
          break;
  
        case '3':
          await findNextStand.execute([latitude, longitude])
          break;
  
        case '4':
          rl.question('Informe o nome do logradouro: ', async logradouro => {
            await findLogradouro.execute(logradouro)
            asyncReadline()
          })
          break;  

        case '5':
          console.log('PROGRAMA ENCERRADO!!')
          //Fechamendo do readLine.
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
