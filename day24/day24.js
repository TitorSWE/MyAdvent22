var fs = require('fs');
var ipt = fs.readFileSync("input24.txt", 'utf8').split('\n');

// parsing 
let myMap = ipt.map(line => line.split(""));
console.log(myMap);

const width = myMap[0].length - 2;
const hight = myMap.length -2;

let start = [0,1];
let end = [hight + 1, width];

console.log(BFS(start,0));

console.log(stormIsComing([4,2],1));

// givien i,j, will storm come in t minutes ?
function stormIsComing([i,j], t){

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
        let round = surrending(actualPos);
        for (let i=0; i<round.length; i++){
            if (round[i][0] === end[0] && round[i][1] === end[1]){
                return actualStep + 1;
            }
            if (!stormIsComing(round[i], actualStep + 1)){
                queue.push([round[i], actualStep + 1]);
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
  