const fetch = require("node-fetch");

const TOKEN = process.env.8491681590:AAH3Ji5lxmNkPkUGLz3bSuHe7zrrftkN2A8;
const CHAT = process.env.-1003777030922;

let lastPeriod = "";
let prediction = null;

function predict(numbers){
    let big = numbers.filter(n => n >=5).length;
    let small = numbers.length - big;
    return big > small ? "BIG" : "SMALL";
}

async function send(msg){
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            chat_id:CHAT,
            text:msg
        })
    });
}

async function run(){
    try{
        let res = await fetch("https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json");
        let data = await res.json();

        let list = data.data.list;
        let current = list[0].issueNumber;

        if(current !== lastPeriod){
            lastPeriod = current;

            let numbers = list.map(i=>parseInt(i.number));
            prediction = predict(numbers);

            let next = (BigInt(current)+1n).toString();

            await send(`🔥 SIGNAL\nPeriod: ${next.slice(-6)}\nPrediction: ${prediction}`);
        }

    }catch(e){}
}

setInterval(run,5000);
console.log("Bot running...");
