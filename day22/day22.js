var fs = require('fs');
var ipt = fs.readFileSync("input22.txt", 'utf8').split('\n\n');

// data structure : a matrix

let instructions = ipt.pop().split("");
let coordinates = ipt[0].split("\n");

// Finding dimension

let width = coordinates.reduce( (max, line) => {
    let len = line.split('').length;
    if (len > max){
        max = len;
    }
    return max;
}, 0);

// Filling the matrix
let myMatrix = coordinates.reduce(toMatrix, []);

// Parsing the instructions
let receipe = instructions.reduce(treatment, [[],'']);
receipe[0].push((Number(receipe[1])));
console.log(receipe[0]);

function toMatrix(mat,line){
    let row = [];
    for (let i=0; i<line.split("").length; i++){
        row.push(line.charAt(i));
    }
    for (let k=line.split("").length; k<width; k++){
        row.push(" ");
    }
    mat.push(row);
    return mat;
}

function treatment(ins, element){
    let numberString = ''
    if (element != 'R' && element != 'L'){
        ins[1] += element;
    } else {
        ins[0].push(Number(ins[1]));
        ins[1] ="";
        ins[0].push(element)
    }
    return ins;
}
