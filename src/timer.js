const colors = require("colors");
const eventEmitter = require("events");
const emitter = new eventEmitter();

console.log(colors.blue('Давайте начнём!'));

// "06.30.2022 11:30:00" <- формат ввода даты
const x = process.argv.slice(2);
function updateTimer() {
    let future  = Date.parse(x);
    let now     = new Date();
    let diff    = future - now;
    if (diff<=0) {
        console.log(colors.green('Ваше будущее уже наступило!'))
        return false;
    } else {
        let days  = Math.floor( diff / (1000*60*60*24) );
        let hours = Math.floor( diff / (1000*60*60) );
        let mins  = Math.floor( diff / (1000*60) );
        let secs  = Math.floor( diff / 1000 );
    
        let d = days;
        let h = hours - days  * 24;
        let m = mins  - hours * 60;
        let s = secs  - mins  * 60;
    
        let result = d + ' days ' + h + ' hours ' + m + ' minutes ' + s + ' seconds ';
        return result;
    }
}
const run = async () => {
    const ourDate = updateTimer();
    if (ourDate){
        emitter.emit('timer', ourDate);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await run();
    }
}
class Handler{
    static ourTimer(payload){
        console.clear();
        console.log("До наступления этой даты осталось:", payload);
    }
}

emitter.on('timer', Handler.ourTimer);

run ();