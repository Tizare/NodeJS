const colors = require("colors");

console.log(colors.blue('Давайте начнём!'));

const [x, y] = process.argv.slice(2);
let first = parseInt(x);
let last = parseInt(y);
const numbers = [];
const color = [colors.green, colors.yellow, colors.red];
var yourNumbers = '';

if (isNaN(first) || isNaN(last)){
    console.log (colors.red("Надо вводить числа!"));
} else {
    for (let i = first; i<=last; i++){
        if (i==2){
            numbers.push(i);
        } else if (i>2){
            let flag = true;
            for (let j = 2; j<i; j++){
                if (i%j==0){
                    flag=false;
                    break;
                }
            }
            if (flag){
                numbers.push(i);
            }
        }
    }
    if (numbers.length===0){
        console.log(color[2]('Нет подходящих решений, закончили.'))
    } else {
        let j = 0;
        for(i = 0; i<numbers.length; i++){
            if (j<3){
                yourNumbers = yourNumbers+(color[j](numbers[i]))+", "
                j++;
            } else {
                j=0;
                yourNumbers = yourNumbers+(color[j](numbers[i]))+", "
                j++;
            }
        }
        console.log(yourNumbers);
    }
}