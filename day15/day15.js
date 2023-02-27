var fs = require('fs');
var ipt = fs.readFileSync("input15.txt", 'utf8').split('\n');

let NumLine = 10;
let SensOnLine = [];
let BeacOnLine = [];
let OnLine = []
let Max = 20;
let hiddenPoint = [];
let frequency;

const Sensor = {
    x:0,
    y:0,
    dist:0,
    contours:[]
}

const Beacon = {
    x:0,
    y:0
}

let treated = ipt.map(treatment);
let data = treated.map(addDist);
let dataWithContours = data.map(addContours);
let hidden = dataWithContours.map(findHidden);
console.log(hiddenPoint);
//frequency = hiddenPoint[0]*4*Math.pow(10,6) + hiddenPoint[1];
console.log(frequency);
let crossOnLine = dataWithContours.reduce(crossFunction,[SensOnLine,BeacOnLine,OnLine]);
let amounts = crossOnLine.map(element => Countdifferent(element));
let cross = amounts[2];
console.log(cross);



function addDist(element){
    let xs = element[0].x;
    let ys = element[0].y;
    let xb = element[1].x;
    let yb = element[1].y;

    let dist = distance([xs,ys],[xb,yb]);
    element[0].dist = dist;
    return element;
}

function treatment(element){
    let line = element.split(':');
    let left = line[0].split(',');
    let right = line[1].split(',');
    let xs = left[0].split("=")[1];
    let ys = left[1].split("=")[1];
    let xb = right[0].split("=")[1];
    let yb = right[1].split("=")[1];
    
    let sens = Object.create(Sensor);
    let beac = Object.create(Beacon);
    sens.x = Number(xs);
    sens.y = Number(ys);
    beac.x = Number(xb);
    beac.y = Number(yb);
    return [sens, beac]

}

function distance([xs,ys],[xb,yb]){
    let left = Math.abs(xs-xb);
    let right = Math.abs(ys-yb);
    return left + right;
}


function crossFunction(MyArrays, element){
    sens = element[0];
    beac = element[1];
    if (sens.y == NumLine){
        MyArrays[0].push(sens.x);
    }
    if (beac.y == NumLine){
        MyArrays[1].push(beac.x);
    }
    AddCross(sens,MyArrays[2]);
    return MyArrays;
}

function AddCross(sens, crossArray){
    let keep = true;
    let right = sens.x;
    let left = sens.x;
    while (keep){
        distLeft = distance([sens.x,sens.y],[left,NumLine]);
        distRight = distance([sens.x,sens.y],[left,NumLine]);
        if (distLeft <= sens.dist){
            crossArray.push(left);
            left -= 1;
        } else {
            keep = false;
        }
        if (distRight <= sens.dist){
            crossArray.push(right);
            right += 1;
        }else {
            keep = false
        }
    }
}

function Countdifferent(array){
    if (array.length === 0){
        return array;
    }
    orderedArray = array.sort((a,b) => a-b);
    let count = 0;
    for (let i=0; i<array.length -1; i++){
        if (orderedArray[i] !== orderedArray[i+1]){
            count += 1;
        }
    }
    return count;
}

function findContours(sens){
    let contours = [];
    let north = [sens.x, sens.y - sens.dist - 1];
    let west = [sens.x - sens.dist - 1, sens.y];
    let east = [sens.x + sens.dist + 1, sens.y];
    let up = west[1];
    let down = west[1];

    let i = west[0];
    while(i <= north[0]){
        if (i>= 0 && i<= Max && up >= 0 && up<= Max){
            contours.push([i,up]);
        }
        if (i>= 0 && i<= Max && down >= 0 && down<= Max){
            contours.push([i,down]);
        }
        i += 1;
        up -= 1;
        down += 1;
    }

    up = west[1];
    down = west[1];
    let j = east[0];
    while(j > north[0]){
        if (j>= 0 && j<= Max && up >= 0 && up<= Max){
            contours.push([j,up]);
        }
        if (j>= 0 && j<= Max && down >= 0 && down<= Max){
            contours.push([j,down]);
        }
        j -= 1;
        up -= 1;
        down += 1;
    }
    return contours;
}

function addContours(element){
    sens = element[0];
    sens.contours = findContours(sens);
    element[0] = sens;
    return element;
}

function isReachableBy([x,y], sens){
    let xs = sens.x;
    let ys = sens.y;
    let dist = distance([x,y],[xs,ys]);
    if (dist <= sens.dist){
        return true;
    }
    return false;
}

function isReachable([x,y]){
    let sens;
    for (let i=0; i<data.length; i++){
        sens = data[i][0];
        if (isReachableBy([x,y], sens)){
            return true;
        }
    }
    hiddenPoint.push([x,y]);
    return false;
}

function findHidden(element){
    contoursReachable = element[0].contours.map(isReachable);
    element[0].contours = contoursReachable;
    return element;
}