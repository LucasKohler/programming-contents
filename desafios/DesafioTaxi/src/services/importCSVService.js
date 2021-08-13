const csvParse = require('csv-parse')
const path = require('path')
const fs = require('fs')

module.exports = class ImportCSVService {
  async execute() {
    //configuração para a ultilização do csv-parse.
    const filepath = path.join(__dirname, '..', '..', 'assets', 'pontos_taxi.csv')
    const readStream = fs.createReadStream(filepath)

    const parsers = csvParse({
      delimiter: ';',
      from_line: 2
    })

    const parseCSV = readStream.pipe(parsers)

    const pontos_taxi = []

    parseCSV.on('data', row => {1
      // Desconstruindo variaveis das colunas do csv
      const [data_extracao, codigo, nome, telefone, logradouro, numero, latitude, longitude] = row

      pontos_taxi.push({ data_extracao, codigo, nome, telefone, logradouro, numero, latitude, longitude })

    })

    //Fechamento da promise do parseCSV.
    await new Promise(resolve => parseCSV.on('end', resolve))

    //Formatando os valores gerados a partir do csv em um array de objetos.
    const pontosFormatados = pontos_taxi.map((ponto) => ({
      data_extracao: new Date(ponto.data_extracao),
      codigo: parseInt(ponto.codigo),
      nome: ponto.nome,
      telefone: ponto.telefone,
      logradouro: ponto.logradouro,
      numero: parseInt(ponto.numero),
      latitude: parseFloat(ponto.latitude.replace(',','.')),
      longitude: parseFloat(ponto.longitude.replace(',','.'))
    }))

    return pontosFormatados
  }
}