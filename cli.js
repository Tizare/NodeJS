#!C:\Program Files\nodejs\node.exe


const fs = require('fs');
const readline = require('readline');
const path = require('path');
const inquirer = require('inquirer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const question = (query) => new Promise(resolve => rl.question(query, resolve));

(async () => {
    const filePath = await question('Введите полный адрес до файла или его начало: ');
    const encoding = await question('Введите кодировку файла (utf8): ');
    const find = await question("Введите, что мы будем в нём искать: ");
    const prompt = inquirer.createPromptModule();
    let check = false;
    let fullPath = filePath;

    do {
        await prompt([{
            name: 'fileName',
            type: 'list',
            message: 'Выберите нужный файл',
            choices: fs.readdirSync(fullPath)
        }]).then(({fileName})=>{
            fullPath = path.join(fullPath, fileName)
            if (fs.lstatSync(fullPath).isDirectory()){
                check=true;
            } else {check=false};
        }) 
    } while (check);
    const readStream = new fs.ReadStream(fullPath, encoding);
    const myFind = readline.createInterface({
        input: readStream
    });
    myFind.on('line', (line)=>{
        if(line.includes(find)){
            console.log(line)
        }
    })
    console.log("Ваши результаты:");
    rl.close();
})();

