const fs = require('fs');
const path = require('path');
const ipt = fs.readFileSync("input-11-1.txt", 'utf8').split('\n\n').map(String);

const ipt2 = fs.readFileSync("input-11-1.txt", 'utf8').split('\n\n').map(String);


const Monkey = {
    number:0,
    items: [],
    operation: [],
    divisible: 0,
    ifTrue: 0,
    ifFalse: 0,
    treated: 0
}

// Part One
monkeyList = ipt.map(parseFunction);
for (let i=0; i<20; i++){
    monkeyList.map(receipe);
}

inspected = monkeyList.reduce(countTreated,[]);

orderInspected = inspected.sort( (a,b) => a-b);

firstMax = orderInspected.pop();
secondMax = orderInspected.pop();
score = firstMax * secondMax;
console.log(score);

// Part two

monkeyListTwo = ipt2.map(parseFunction);

lcm = monkeyList.reduce(findLCLM,1);

for (let i=0; i<10000; i++){
    monkeyListTwo.map(receipeTwo);
}

inspectedTwo = monkeyListTwo.reduce(countTreated,[]);

orderInspectedTwo = inspectedTwo.sort( (a,b) => a-b);

firstMaxTwo = orderInspectedTwo.pop();
secondMaxTwo = orderInspectedTwo.pop();
scoreTwo = firstMaxTwo * secondMaxTwo;

console.log(scoreTwo);

function parseFunction(input, index){

    line = input.split('\n').map(String);
    //Starting items
    items = line[1].split(":").map(String)[1].split(',').map(Number);
    //Operation
    operation = line[2].split(":").map(String)[1].split('=')[1].split(' ').map(String);
    operation.shift();
    //Divisible by
    div = Number(line[3].split("by ").map(String)[1]);
    //ifTrue & ifFalse
    ifTrue = Number(line[4].split("monkey ")[1]);
    ifFalse = Number(line[5].split("monkey ")[1])
    

    monkey = Object.create(Monkey);
    monkey.valeur = index;
    monkey.items = items;
    monkey.operation = operation;
    monkey.divisible = div;
    monkey.ifTrue = ifTrue;
    monkey.ifFalse = ifFalse;
    monkey.treated = 0;

    return monkey;
}

function receipe(monkey){
    while (monkey.items.length > 0){
        item = monkey.items.shift();
    worry = operationFunction(item, monkey.operation);
    worry = Math.trunc(worry/3);
    if (worry%monkey.divisible == 0){
        monkeyList[monkey.ifTrue].items.push(worry);
    }
    else {
        monkeyList[monkey.ifFalse].items.push(worry);
    }
    monkey.treated += 1;
    }
    return monkey;
}

function receipeTwo(monkey){
    while (monkey.items.length > 0){
        item = monkey.items.shift();
    worry = operationFunction(item, monkey.operation);
    if (worry%monkey.divisible == 0){
        monkeyListTwo[monkey.ifTrue].items.push(worry % lcm);
    }
    else {
        monkeyListTwo[monkey.ifFalse].items.push(worry % lcm);
    }
    monkey.treated += 1;
    }
    return monkey;
}

function countTreated(accumulateur, valeurCourante){
    accumulateur.push(valeurCourante.treated);
    return accumulateur;
}

function findLCLM(accumulateur,valeurCourante){
    accumulateur *= valeurCourante.divisible;
    return accumulateur;
}

function operationFunction(worry, [a,op,b]){
    if (a == "old"){
        x = worry;
    }
    else{
        x = Number(a);
    }
    if (b == "old"){
        y = worry;
    }
    else{
        y = Number(b);
    }
    if (op == '*'){
        return x*y;
    }
    else {
        return x + y;
    }
}