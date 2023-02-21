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

