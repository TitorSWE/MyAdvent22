var fs = require('fs');
var ipt = fs.readFileSync("input-shape.txt", 'utf8').split('\n\n');

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

let firstShape = Object.create(Shape);
firstShape.down = cave.high + 4;
firstShape.up = firstShape.down + shapes[2].length;
for (let i=cave.high; i<firstShape.up; i++){
    cave.matrix.push([1,0,0,0,0,0,0,0,1]);
}
firstShape.listPoints = findPoints(shapes[2], cave);
translation(firstShape,[0,-3]);
console.log(conflict(firstShape, cave));

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
                let x = j + 2;
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

