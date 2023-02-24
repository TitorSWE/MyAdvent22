var fs = require('fs');
var ipt = fs.readFileSync("input24.txt", 'utf8').split('\n');

// parsing 
let myMap = ipt.map(line => line.split(""));

const width = myMap[0].length - 2;
const hight = myMap.length -2;

let start = [0,1];
let end = [hight + 1, width];

let hashMatrix = [];
for (let i=0; i<myMap.length; i++){
    let line = []
    for (let j=0; j<myMap[0].length; j++){
        line.push(false);
    }
    hashMatrix.push(line);
}
hashMatrix[0][1] = true;

console.log(BFS(start,0));




// givien i,j, will storm come in t minutes ?
function stormIsComing([i,j], t){
    if (myMap[getIndex(i + t, hight)][j] === '^'){
        return true;
    }
    if (myMap[getIndex(i - t, hight)][j] === 'v'){
        return true;
    }
    if (myMap[i][getIndex(j + t, width)] === '<'){
        return true;
    }
    if (myMap[i][getIndex(j - t, width)] === '>'){
        return true;
    }
    return false;
}

function getIndex(num, parameter){
    let res = (num%parameter + parameter)%parameter;
    if (res === 0){
        return parameter;
    }
    return res;
}

// without considering wind, give all possible moves

function surrending([i,j]){
    let round = [];
    if (i == hight && j == width){
        round.push(end);
    }
    if (i == 1 && j == 1){
        round.push(start);
    }
    if (i != hight){
        round.push([i+1,j]);
    }
    if (i != 1 && i !=0 ){
        round.push([i-1,j]);
    }
    if (j != width){
        round.push([i,j+1]);
    }
    if (j != 1){
        round.push([i,j-1]);
    }
    return round;
}

function BFS([i,j], step){

    let queue = [[[i,j], step]];

    while(!queue.length !== 0){

        let [actualPos, actualStep] = queue.shift();
        console.log(actualPos);
        let round = surrending(actualPos);
        let toVisit = [];
        for (let i=0; i<round.length; i++){
            if (round[i][0] === end[0] && round[i][1] === end[1]){
                return actualStep + 1;
            }
            if (!stormIsComing(round[i], actualStep + 1)){
                toVisit.push(round[i]);
            }
        }
        if (!stormIsComing(actualPos, actualStep + 1) && toVisit.length == 0){
            queue.push([actualPos, actualStep + 1]);
        }

        let allVisited = true;
        for (let i=0; i<toVisit.length; i++){
            if (hashMatrix[toVisit[i][0]][toVisit[i][1]] === false){
                hashMatrix[toVisit[i][0]][toVisit[i][1]] = true;
                allVisited = false;
                queue.push([toVisit[i], actualStep + 1]);
            }
        }
        if (allVisited){
            for (let i=0; i<toVisit.length; i++){
                queue.push([toVisit[i], actualStep + 1]);
            }
        }
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  