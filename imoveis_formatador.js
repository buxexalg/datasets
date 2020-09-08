const fs = require("fs");
const csvParser = require('csv-parser');
const { abort } = require("process");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const chalk = require('chalk');

const stream = fs.createReadStream("houses.csv").pipe(csvParser());

let conteudo = [];

console.log(chalk.cyan('Arquivo começou a ser processado.'));

stream.on("data", (data) => {
    
    conteudo.push({
        id: conteudo.length +1,
        city: data["city"].trim(),
        area: Number(data['area']),
        rooms: Number(data['rooms']),
        bathroom: Number(data['bathroom']),
        'parking spaces': Number(data['parking spaces']),
        floor: Number(data['rooms'].replace("-","0")),
        animal: Boolean(data['animal']),
        furniture: Boolean(data['furniture']),
        hoa: Number(data['hoa']*100),
        'rent amount': Number(data['rent amount']*100),
        'property tax': Number(data['property tax']*100),
        'fire insurance': Number(data['fire insurance']*100),
        total: Number(data['total']*100)
    });
    
})

stream.on("end", () => {
    const csvWriter = createCsvWriter({
        path: 'imoveis.csv',
        header: [
            {id: 'id', title: 'id'},
            {id: 'city', title: 'city'},
            {id: 'area', title: 'area'},
            {id: 'rooms', title: 'rooms'},
            {id: 'bathroom', title: 'bathroom'},
            {id: 'parking spaces', title: 'parking spaces'},
            {id: 'floor', title: 'floor'},
            {id: 'animal', title: 'animal'},
            {id: 'furniture', title: 'furniture'},
            {id: 'hoa', title: 'hoa'},
            {id: 'rent amount', title: 'rent amount'},
            {id: 'property tax', title: 'property tax'},
            {id: 'fire insurance', title: 'fire insurance'},
            {id: 'total', title: 'total'}
        ]
    });
    
    csvWriter.writeRecords(conteudo);

    console.log(chalk.green(`O arquivo terminou de ser processado e o arquivo ${createCsvWriter.path} foi criado`));
})