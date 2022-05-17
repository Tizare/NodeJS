const fs = require('fs');
const readline = require('readline');

// Log - путь к файлу для выборки
// ourLine - задаёт параметры поиска, должна быть массивом
const LOG = './test.log';
const ourLine = ['89.123.1.41', '34.48.240.111' ]

const readStream = new fs.ReadStream(LOG, 'utf8');
const myInterface = readline.createInterface({
    input: readStream
})

myInterface.on('line', (line)=>{
    ourLine.forEach(el => {
        if(line.includes(el)){
            fs.writeFile('./'+el+'_requests.log', (line+'\n'), {flag:'a'}, (err)=>console.log(err));
            }
    });
})

