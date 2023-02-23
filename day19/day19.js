var fs = require('fs');
const { builtinModules } = require('module');
const { setFlagsFromString } = require('v8');
let ipt = fs.readFileSync("input19.txt", 'utf8').split('\n');

// Parsing 

ipt.shift();

let robots = ipt.map(treatment);
let rocks = robots.reduce(createRocks, []);
robots[0].quantity = 1;

// Finding maximum production

robots.map(findMaxProd);
robots[3].prodMax = Infinity;
let minute = 1;

function recursiveGeode(listRobots, listRocks, minute, robotInConstruction){

    if (minute === 25){
        return listRobots[3].quantity;
    }

    let currentRobots = JSON.parse(JSON.stringify(listRobots));
    let currentRocks = JSON.parse(JSON.stringify(listRocks));

    if (typeof robotInConstruction === 'string'){
        addRobot(robotInConstruction, currentRobots, currentRocks);
    }
    farming(currentRobots, currentRocks);

}

function farming(robots, rocks){
    for (let i=0; i<robots.length;i++){
        rocks[i].quantity += robots[i].quantity
    }
}

function addRobot(name, robots, rocks){
    let index = 0;
    while(robots[index].type != name){
        index += 1;
    }
    robots[index].quantity += 1;
    for (let i=0; i<robots[index].construction.length; i++){
        let rockType = robots[index].construction[i][1];
        let qt = robots[index].construction[i][0];
        actualize(rocks, rockType, qt);
    }
}

function actualize(rocks, rockType, qt){
    let index = 0;
    while(rocks[index].type != rockType){
        index += 1;
    }
    rocks[index].quantity -= qt;
}

function findMaxProd(robot, index, array){
    let max = 0;
    for (let i=0; i<array.length; i++){
        if (index !== i){
            for (let j=0; j<array[i].construction.length; j++){
                if (array[i].construction[j][1] === robot.type){
                    if (array[i].construction[j][0] > max){
                        max = array[i].construction[j][0];
                    }
                }
            }
        } 
    }
    robot.prodMax = max;
    return robot;
}

function treatment(instruction){
    let line = instruction.split('.')[0];
    [left, right] = line.split('robot costs ');
    let type = left.split(" ")[3];
    let composition = right.split(" and ");
    let construction = [];
    for (let i=0; i<composition.length; i++){
        [amount, what] = composition[i].split(" ");
        construction.push([Number(amount), what]);
    }

    let robot = new robotFactory(type, construction);
    return robot;
}

function robotFactory(type, construction){
    this.type = type;
    this.construction = construction;
    this.prodMax = 0;
    this.quantity = 0;
}

function rockFactory(type){
    this.type = type;
    this.quantity = 0;
}

function createRocks(list, robot){
    let type = robot.type;
    let rock = new rockFactory(type);
    list.push(rock);
    return list;
}



