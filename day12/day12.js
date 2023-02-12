var fs = require('fs');
var path = require('path');
var ipt = fs.readFileSync("input12-1.txt", 'utf8').split('\n').map(String);



// First : Creation of all Nodes, stored in a matrix

const Node = {
    letter:"a",
    coord:[],
    value: 0,
    marked: false,
    distance: 0,
    adjactent: []
}

nodeMatrix = []
line = []

function nodeValue(char){
    if (char == "S"){
        return "a".charCodeAt(0);
    }
    if (char == "E"){
        return "z".charCodeAt(0);
    }
    return char.charCodeAt(0)
}

let S = []
for (let i=0; i<ipt.length ; i++){
    line = [];
    for (let j=0; j<ipt[0].length; j++){
        let letter = ipt[i][j]
        if (letter == "S"){
            S.push(i);
            S.push(j);
        }
        node = Object.create(Node);
        node.letter = letter;
        node.coord = [i,j];
        node.value = nodeValue(letter)
        node.marked = false,
        node.distance = 0;
        line.push(node)
    }
    nodeMatrix.push(line)
}



// Second, find adjacents nodes for each node

for (let i=0; i<nodeMatrix.length; i++){
    for (let j=0; j<nodeMatrix[0].length; j++){
        let adjacents = findAdjacents(nodeMatrix[i][j]);
        nodeMatrix[i][j].adjacents = adjacents;
    }
}



function findAdjacents(node){
    let adjacents = [];
    [i,j] = node.coord
    if (i < nodeMatrix.length - 1){
        if (node.value + 1 >= nodeMatrix[i+1][j].value){
            adjacents.push(nodeMatrix[i+1][j]);
        }
    }
    if (i >= 1){
        if (node.value + 1 >= nodeMatrix[i-1][j].value){
            adjacents.push(nodeMatrix[i-1][j]);
        }
    }
    if (j < nodeMatrix[0].length -1){
        if (node.value + 1 >= nodeMatrix[i][j+1].value){
            adjacents.push(nodeMatrix[i][j+1]);
        }
    }
    if (j >= 1){
        if (node.value + 1 >= nodeMatrix[i][j-1].value){
            adjacents.push(nodeMatrix[i][j-1]);
        }
    }
    return adjacents
}


// Finally, implement a breadth-first-search function

function search(root){
    queue = [];
    root.marked = true;
    queue.push(root);

    while(queue.length>0){
        newRoot = queue.shift();
        if (newRoot.letter == "E"){
            return newRoot.distance;
        }
        for (let i=0; i<newRoot.adjacents.length;i++){
            node = newRoot.adjacents[i];
            if (node.marked == false){
                node.marked = true;
                node.distance = newRoot.distance + 1;
                queue.push(node);
            }
        }
    }
}

console.log(search(nodeMatrix[S[0]][S[1]]))
