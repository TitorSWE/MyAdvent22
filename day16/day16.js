var fs = require('fs');
var ipt = fs.readFileSync("input16.txt", 'utf8').split('\n');

const Valve = {
    name: "",
    flowRate: 0,
    reachableValves: [],
    isOpen: false,
    isEndPoint:false,
    isForbidden:false

}

let valvesList = ipt.map(treatment);
let nonNullValves = valvesList.reduce( (acc,valve) => {
    if (valve.flowRate !=0){
        acc += 1;
    }
    return acc;
},0);
console.log(nonNullValves);
let valvesGraph = valvesList.map(adjacent);
let minute = 1;
let pressure = 0;

let max = MaxPressure(valvesGraph[0], minute, pressure, []);
console.log(max);

function treatment(element){
    let line = element.split(';');
    let name = line[0].split(' ')[1];
    let rate = line[0].split(' ')[4].split('=')[1];
    let right = line[1].split(' to ');
    let valves = right[1].split(', ');
    valves[0] = valves[0].split(' ')[1];

    
    let valve = Object.create(Valve);
    valve.name = name;
    valve.flowRate = Number(rate);
    valve.reachableValves = valves;
    valve.isOpen = false;
    valve.isForbidden = false;
    if (valve.adjacent.length == 1){
        valve.isEndPoint = true;
    } else {
        valve.isEndPoint = false;
    }
    return valve;
}

function adjacent(element){
    let reach = element.reachableValves;
    let newReach = reach.map(toObject);
    element.reachableValves = newReach;
    return element;
}

function toObject(element){
    for(let i=0; i<valvesList.length;i++){
        if (element === valvesList[i].name){
            return valvesList[i];
        }
    }
}

function MaxPressure(valve, minute, pressure, opened, previous){

    console.log(valve.name, minute, pressure);

    if (opened.length == nonNullValves){
        return pressure;
    }

    if (minute == 30){
        return pressure;
    }

    let scores = [];
    if (isOpen(valve, opened)){
        for (let i=0; i<valve.reachableValves.length; i++){
            scores.push(MaxPressure(valve.reachableValves[i], minute + 1, pressure, opened, valve));
        }
        return Math.max(...scores);
    }
    if (!isOpen(valve, opened)){
        for (let i=0; i<valve.reachableValves.length; i++){
            if (previous != valve.reachableValves[i] || isOpen(previous, opened)){
                scores.push(MaxPressure(valve.reachableValves[i], minute + 1, pressure, opened, valve));
            }
        }
        if (valve.flowRate != 0){
            opened.push(valve.name);
            scores.push(MaxPressure(valve, minute + 1, pressure + valve.flowRate*(30-minute), opened, valve));
        }
        return Math.max(...scores);
    }
    
}

function isOpen(valve, opened){

    for (let i=0; i<opened.length; i++){
        if (opened[i] == valve.name){
            return true;
        }
    }
    return false;
}

function isIn(opened, previous){
    for (let i=0; i<opened.length; i++){
        if (opened[i].name == previous.name){
            return true;
        }
    }
    return false;
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  
