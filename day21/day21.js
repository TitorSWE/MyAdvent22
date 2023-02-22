var fs = require('fs');
var ipt = fs.readFileSync("input21.txt", 'utf8').split('\n');

const Monkey = {
    name: "",
    operation: [],
    father: []
}
// part one
let indexRoot;
let indexMe;
let monkeys = ipt.map(toObject);
monkeys.map(toGraph);

let yellRoot = yell(monkeys[indexRoot]);
console.log(yellRoot);

// part two
monkeys[indexMe].operation = 0;
monkeys[indexRoot].operation[1] = '-';
// There is only one branch which links the root and humn
let path = findPath(monkeys[indexMe],[]);
let res = equationRecursive(monkeys[indexRoot],0);
console.log(res);

function equationRecursive(monkey, value){
    
    if (monkey.name === 'humn'){
        return value;
    }

    let monkeyLeft = monkey.operation[0];
    let operation = monkey.operation[1];
    let monkeyRight = monkey.operation[2];

    let pathAtLeft = inPath(monkeyLeft);
    let known;
    if (pathAtLeft){
        known = yell(monkeyRight);
    } else {
        known = yell(monkeyLeft);
    }

    let newValue = solve(value, known, pathAtLeft, operation);
    if (pathAtLeft){
        return equationRecursive(monkeyLeft, newValue);
    } else {
        return equationRecursive(monkeyRight, newValue);
    }

}

function solve(value, known, pathAtLeft, operation){
    if (operation === '+'){
        return value - known;
    }
    if (operation === '-'){
        if (pathAtLeft){
            return value + known;
        } else {
            return known - value;
        }
    }
    if (operation === '*'){
        return value / known;
    }
    if (operation === '/'){
        if (pathAtLeft){
            return value*known;
        } else {
            return known/value;
        }
    }
}

function inPath(monkey){
    for (let i=0; i<path.length; i++){
        if (path[i].name === monkey.name){
            return true;
        }
    }
    return false;
}

function findPath(monkey, list){
    list.push(monkey);
    if (monkey.father[0].name == 'root'){
        return list;
    } else if (monkey.father.length !== 1){
        return [false, list];
    } else {
        return findPath(monkey.father[0], list);
    }
}

function toObject(element, index){
    let [name, right] = element.split(': ');
    if (name === "root"){
        indexRoot = index;
    }
    if (name === "humn"){
        indexMe = index;
    }
    let monkey = Object.create(Monkey);
    monkey.name = name;
    let operation = right.split(' ');
    if (operation.length == 1){
        monkey.operation = Number(operation[0]);
    }
    else {
        let monkeyLeft = operation[0];
        let monkeyRight = operation[2];
        let op = operation[1]
        monkey.operation = [monkeyLeft,op,monkeyRight];
    }
    monkey.father = [];
    return monkey;
}

function toGraph(element){
    let op = element.operation;
    if (typeof op !== 'number'){
        let monkeyLeft = findMonkey(op[0]);
        monkeyLeft.father.push(element);
        let monkeyRight = findMonkey(op[2]);
        monkeyRight.father.push(element);
        element.operation[0] = monkeyLeft;
        element.operation[2] = monkeyRight;

    } 
    return element
}

function findMonkey(name){
    let res = monkeys.filter( (monkey) => (monkey.name == name));
    return res[0];
}

function yell(monkey){
    if (typeof monkey.operation === 'number'){
        return monkey.operation;
    }
    if (monkey.operation[1] === '+'){
        return yell(monkey.operation[0]) + yell(monkey.operation[2]);
    }
    if (monkey.operation[1] === '-'){
        return yell(monkey.operation[0]) - yell(monkey.operation[2]);
    }
    if (monkey.operation[1] === '*'){
        return yell(monkey.operation[0]) * yell(monkey.operation[2]);
    }
    if (monkey.operation[1] === '/'){
        return yell(monkey.operation[0]) / yell(monkey.operation[2]);
    }
    if (monkey.operation[1] === '='){
        return yell(monkey.operation[0]) == yell(monkey.operation[2]);
    }
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  

