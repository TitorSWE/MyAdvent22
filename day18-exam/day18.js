var fs = require('fs');
var ipt = fs.readFileSync("input18.txt", "utf8").split('\n');

let cubes = ipt.map( element => element.split(',').map(Number));

// Part one
let faces = 0;
// counting neighboors for each cubes
let adjacents = cubes.reduce(countAdjacent, faces);
// exterior faces
let resOne = (6*cubes.length - adjacents);
console.log("partOne ", resOne);


// Part two :
// Find deliminations
let [[xmin, ymin, zmin], [xmax, ymax, zmax]] = cubes.reduce(findMax, [[0,0,0],[0,0,0]]);
// console.log([[xmin, ymin, zmin], [xmax, ymax, zmax]]);

let start = [xmin-1,ymin-1,zmin-1];
let end = [xmax + 1,ymax + 1, zmax +1];
let longest = Math.max(...end);
let smallest =Math.min(...start);

// Search with BFS
let resTwo = BFS([smallest, smallest, smallest], cubes, [longest,longest,longest]);
console.log("Part two ",resTwo);

function BFS(start, cubes, end){
    let queue = [];
    queue.push(start);
    let amount = 0;
    let visited = [];
    
    while(queue.length !=0){
        let current = queue.shift();
        let access = reachable(current, start, end);
        for (let i=0; i<access.length; i++){
            if (isIn(cubes, access[i])){
                amount += 1;
            } else {
                if (!isIn(visited, access[i])){
                    queue.push(access[i]);
                    visited.push(access[i]);
                }
            }
        }
    }
    return amount;
}

function reachable(point, start, end){
    let [x,y,z] = point;
    let neighboors = [];
    if (x+1 <= end[0] && x+1 >= start[0]){
        neighboors.push([x+1,y,z]);
    }
    if (x-1 <= end[0] && x-1 >= start[0]){
        neighboors.push([x-1,y,z]);
    }
    if (y+1 <= end[1] && y+1 >= start[1]){
        neighboors.push([x,y+1,z]);
    }
    if (y-1 <= end[1] && y-1 >= start[1]){
        neighboors.push([x,y-1,z]);
    }
    if (z+1 <= end[2] && z+1 >= start[2]){
        neighboors.push([x,y,z+1]);
    }
    if (z-1 <= end[0] && z-1 >= start[2]){
        neighboors.push([x,y,z-1]);
    }
    return neighboors;

}

function findMax(extremum, cube){
    let [x,y,z] = cube;
    let min = extremum[0];
    let max = extremum[1];
    if (x<min[0]){
        min[0] = x;
    }
    if (y<min[0]){
        min[1] = y;
    }
    if (z<min[0]){
        min[2] = z;
    }
    if (x>max[0]){
        max[0] = x;
    }
    if (y>max[1]){
        max[1] = y;
    }
    if (z>max[2]){
        max[2] = z;
    }
    return [min,max];
}

function countAdjacent(acc, cube, index, array){
    let [x,y,z] = cube;
    let count = 0;
    if (isIn(array, [x + 1, y, z])){
        count +=1;
    }
    if (isIn(array, [x - 1, y, z])){
        count +=1;
    }
    if (isIn(array, [x, y + 1, z])){
        count +=1
    }
    if (isIn(array, [x, y - 1, z])){
        count +=1
    }
    if (isIn(array, [x, y, z + 1])){
        count +=1
    }
    if (isIn(array, [x, y, z - 1])){
        count +=1
    }
    acc += count;
    return acc
}

function isIn(array, [x,y,z]){
    for (let i=0; i<array.length; i++){
        if (array[i][0] == x && array[i][1] == y && array[i][2] == z){
            return true;
        }
    }
    return false;
}