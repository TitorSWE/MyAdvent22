var fs = require('fs');
var ipt = fs.readFileSync("input9.txt", 'utf8').split('\n');


const Head = {
    x:0,
    y:0,
    lastX:0,
    lastY:0,
    lastMove:[]
}

const Tail = {
    number:0,
    x:0,
    y:0,
    lastX: 0,
    lastY: 0,
    lastMove: [0,0],
    visited: [],
    following: 0
}

let head = Object.create(Head);
head.x = 0;
head.y = 0;

let tail = Object.create(Tail);
tail.x = 0;
tail.y = 0;
tail.dist = 0,
tail.visited = [[0,0]];
tail.following = head;

// Part One

ipt.forEach(move);
tail.visited.sort(compare);
let different = tail.visited.reduce(unique,[]);
let numberVisited = different.length; // start doesn't count

// Part two 
let headTwo = Object.create(Head);
head.x = 0;
head.y = 0;

let tailTwo = Object.create(Tail);
tailTwo.number = 1;
tailTwo.x = 0;
tailTwo.y = 0;
tailTwo.dist = 0,
tailTwo.visited = [[0,0]];
tailTwo.following = head;
tailTwo.lastMove = [0,0];

let listTails = [tailTwo];
for (let i=0; i<8; i++){
    let tailLoop = Object.create(Tail);
    tailLoop.x = 0;
    tailLoop.y = 0;
    tailLoop.dist = 0,
    tailLoop.visited = [[0,0]];
    tailLoop.following = listTails[i];
    tailLoop.lastMove = [0,0];
    tailLoop.number = i + 2;
    listTails.push(tailLoop)
}

ipt.forEach(moveTwo);
console.log(listTails[5].visited);
let orderedAllVisited = listTails[3].visited.sort(compare);
let allDifferent = orderedAllVisited.reduce(unique, []);
let res = allDifferent.length;
console.log(res);

function moveTwo(element){
    let [instruction, amount] = element.split(' ');
    if (instruction == 'R'){ moveRight(head, listTails, Number(amount));}
    if (instruction == 'L'){ moveLeft(head, listTails, Number(amount));}
    if (instruction == 'U'){ moveUp(head, listTails, Number(amount));}
    if (instruction == 'D'){ moveDown(head, listTails, Number(amount));}
}


function move(element){
    let [instruction, amount] = element.split(' ');
    if (instruction == 'R'){ moveRight(head, [tail], Number(amount));}
    if (instruction == 'L'){ moveLeft(head, [tail], Number(amount));}
    if (instruction == 'U'){ moveUp(head, [tail], Number(amount));}
    if (instruction == 'D'){ moveDown(head, [tail], Number(amount));}
}

function moveUp(head, tails, amount){
    for (let i=0; i<amount; i++){
        head.lastX = head.x;
        head.lastY = head.y;
        head.y += 1;
        tails.map(actualize);
    }
}

function moveDown(head, tails, amount){
    for (let i=0; i<amount; i++){
        head.lastX = head.x;
        head.lastY = head.y;
        head.y -= 1;
        tails.map(actualize);
    }
}

function moveRight(head, tails, amount){
    for (let i=0; i<amount; i++){
        head.lastX = head.x;
        head.lastY = head.y;
        head.x += 1;
        tails.map(actualize);
    }
}

function moveLeft(head, tails, amount){
    for (let i=0; i<amount; i++){
        head.lastX = head.x;
        head.lastY = head.y;
        head.x -= 1;
        tails.map(actualize);
    }
}

function actualize(tail){
    let xh = tail.following.x;
    let yh = tail.following.y;
    let xt = tail.x;
    let yt = tail.y;
    let len = norm(tail.following.lastMove);
    if (len > 1 && distance([xh,yh],[xt,yt])>=2){
        tail.lastMove[0] = tail.following.lastMove[0];
        tail.lastMove[1] = tail.following.lastMove[1];
        tail.lastX = tail.x;
        tail.lastY = tail.y;
        tail.x += tail.lastMove[0];
        tail.y += tail.lastMove[1];
    }
    else if (distance([xh,yh],[xt,yt])>=2){
        tail.lastMove[0] = tail.following.lastX - tail.x;
        tail.lastMove[1] = tail.following.lastY - tail.y;
        tail.lastX = tail.x;
        tail.lastY = tail.y;
        tail.x = tail.following.lastX;
        tail.y = tail.following.lastY;
    }
    else {
        tail.lastMove[0] = 0;
        tail.lastMove[1] = 1;
    }
    tail.visited.push([tail.x, tail.y]);
    return tail;
}

function distance([xh,yh],[xt,yt]){
    let X = Math.pow(xh-xt, 2);
    let Y = Math.pow(yt-yh, 2);
    return Math.pow(X+Y,0.5);
}

function compare(p1, p2){
    if (p1[0] < p2[0]){
        return -1;
    }
    if (p1[0] > p2[0]) {
        return 1;
    }
    if (p1[1] < p2[1]) {
        return -1;
    }
    if (p1[1] > p2[1]) {
        return 1
    }
    return 0;
}

function unique(list, currentPoint, index, array){
    if (index < array.length -1 ){
        if (compare(currentPoint, array[index + 1]) != 0){
            list.push(currentPoint);
        }
    }
    if (index == array.length - 1){
        list.push(currentPoint);
    }
    return list
}

function norm(array){
    let X = Math.pow(array[0],2);
    let Y = Math.pow(array[1],2);
    return Math.pow(X+Y,2);
}

function retryVisited(toretry, currentElement){
    for (let i=0; i<currentElement.visited.length; i++){
        toretry.push(currentElement.visited[i]);
    }
    return toretry;
}