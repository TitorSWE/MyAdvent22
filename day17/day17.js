var fs = require('fs');
var ipt = fs.readFileSync("input-shape.txt", 'utf8').split('\n\n');
let instructions = fs.readFileSync("input17.txt", 'utf8');

let shapes = ipt.map(element => element.split('\n'));
console.log(shapes);

const Shape = {
    listPoints: [],
    down: 0,
    left: 0,
    up:0
}

const Cave = {
    matrix: [],
    high: 0,
}

let cave = Object.create(Cave);
cave.high = 0;
cave.matrix = [[1,1,1,1,1,1,1,1,1]];


let countRock = 0;
let count = 0;
while(countRock < 2022){
    let shape = Object.create(Shape);
    shape.down = cave.high + 4;
    shape.up = shape.down + shapes[countRock % shapes.length].length -1;
    for (let i=cave.high; i<shape.up; i++){
        cave.matrix.push([1,0,0,0,0,0,0,0,1]);
    }
    shape.listPoints = findPoints(shapes[countRock % shapes.length], cave);
    let stuck = false;
    while (!stuck){
        if (instructions.charAt(count%instructions.length) == '<'){
            moveLeft(shape, cave);
        }
        if (instructions.charAt(count%instructions.length) == '>'){
            moveRight(shape, cave);
        }
        stuck = fall(shape, cave);
        count += 1;
    }

    if (shape.up > cave.high){
        cave.high = shape.up;
    }
    
    for (let i=0; i<shape.listPoints.length; i++){
        let [x,y] = shape.listPoints[i];
        cave.matrix[y][x] = 1;
    }
    countRock += 1;
}

console.log(cave.high);

function findLeft(stringShape){
    for (let i=0; i<stringShape.length; i++){
        if (stringShape[i].charAt(0) == '#'){
            return i+2;
        }
    }
}

function findPoints(stringShape, cave){
    let arrayIndex = [];
    for (let i=0 ; i<stringShape.length; i++){
        for (let j=0; j<stringShape[0].length; j++){
            if (stringShape[i].charAt(j) == '#'){
                let x = j + 3;
                let y = cave.high + 4 +(stringShape.length - 1 - i);
                arrayIndex.push([x,y]);
            }
        }
    }
    return arrayIndex;
}

function translation(shape, [x,y]){
    for (let i=0; i< shape.listPoints.length; i++){
        shape.listPoints[i][0] += x;
        shape.listPoints[i][1] += y;
    }
}

function conflict(shape, cave){
    for (let i=0; i<shape.listPoints.length; i++){
        let [x,y] = shape.listPoints[i];
        if (cave.matrix[y][x] == 1){
            return true;
        }
    }
    return false;
}

function moveLeft(shape, cave){
    translation(shape, [-1,0]);
    if (conflict(shape, cave)){
        translation(shape, [1,0]);
    }
}

function moveRight(shape, cave){
    translation(shape, [1,0]);
    if (conflict(shape, cave)){
        translation(shape, [-1,0]);
    }
}

function fall(shape, cave){
    translation(shape, [0,-1]);
    shape.up -= 1;
    shape.down -=1;
    if (conflict(shape, cave)){
        translation(shape, [0,1]);
        shape.up += 1;
        shape.down +=1;
        return true;
    }
    return false;
}
