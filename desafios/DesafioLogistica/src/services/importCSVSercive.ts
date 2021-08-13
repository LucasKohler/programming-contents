import csvParse from 'csv-parse'
import path from 'path'
import fs from 'fs'

interface CSV {
  [key: string]: number;
}

interface Cities{
  name: string;
  distances: {
    [ket:string]: number;
  };
}

class ImportCSVService{
  async execute(): Promise<Cities[]>{
    //configuração para a ultilização do csv-parse.
    const filepath = path.join(__dirname, '..', '..', 'assets', 'DNIT-Distancias.csv')
    const readStream = fs.createReadStream(filepath)

    const parsers = csvParse({
      delimiter: ';',
      from_line: 2
    })

    const parseCSV = readStream.pipe(parsers)

    const cities = ['aracaju', 'belem', 'belo horizonte', 'brasilia', 'campo grande',
      'cuiaba', 'curitiba', 'florianopolis', 'fortaleza', 'goiania',
      'joao pessoa', 'maceio', 'manaus', 'natal', 'porto alegre',
      'porto velho', 'recife', 'rio branco', 'rio de janeiro', 'salvador',
      'sao luis', 'sao paulo', 'teresina', 'vitoria']
      
    const citiesDistances: CSV[] = []

    //Leitura do arquivo CSV.
    parseCSV.on('data', row => {
      const [
        aracaju, belem, belo_horizonte, brasilia, campo_grande,
        cuiaba, curitiba, florianopolis, fortaleza, goiania,
        joao_pessoa, maceio, manaus, natal, porto_alegre,
        porto_velho, recife, rio_branco, rio_de_janeiro, salvador,
        sao_luis, sao_paulo, teresina, vitoria
      ] = row.map((cell: string) => parseInt(cell))

      citiesDistances.push({ aracaju, belem, belo_horizonte, brasilia, campo_grande,
        cuiaba, curitiba, florianopolis, fortaleza, goiania,
        joao_pessoa, maceio, manaus, natal, porto_alegre,
        porto_velho, recife, rio_branco, rio_de_janeiro, salvador,
        sao_luis, sao_paulo, teresina, vitoria })
    })

    //Fechamento da promise do parseCSV.
    await new Promise(resolve => parseCSV.on('end', resolve))

    //Organizando as cidades e distâncias em um array de objetos.
    const organizedCities = citiesDistances.map((distance, index) => ({
      name: cities[index],
      distances: {
        aracaju: distance.aracaju,
        belem: distance.belem,
        belo_horizonte: distance.belo_horizonte,
        brasilia: distance.brasilia,
        campo_grande: distance.campo_grande,
        cuiaba: distance.cuiaba,
        curitiba: distance.curitiba,
        florianopolis: distance.florianopolis,
        fortaleza: distance.fortaleza,
        goiania: distance.goiania,
        joao_pessoa: distance.joao_pessoa,
        maceio: distance.maceio,
        manaus: distance.manaus,
        natal: distance.natal,
        porto_alegre: distance.porto_alegre,
        porto_velho: distance.porto_velho,
        recife: distance.recife,
        rio_branco: distance.rio_branco,
        rio_de_janeiro: distance.rio_de_janeiro,
        salvador: distance.salvador,
        sao_luis: distance.sao_luis,
        sao_paulo: distance.sao_paulo,
        teresina: distance.teresina,
        vitoria: distance.vitoria
      }
    }))
    
    return organizedCities
  }
}

export default ImportCSVService