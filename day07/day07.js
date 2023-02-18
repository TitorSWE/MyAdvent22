const { dir } = require('console');
var fs = require('fs');
let ipt = fs.readFileSync("input7.txt", 'utf8').split('\n').map(String);
ipt.shift();


const Directory = {
    name: '',
    father : 0,
    children : [],
    size: 0
}

const File = {
    name: '',
    size: 0
}

let Root = Object.create(Directory);
Root.name = '/';
Root.children = [];
Root.size = 0;

// Part One
let dirList = [];
dirList.push(Root);
ipt.reduce(treatment, Root);
computeSize(Root);

let score = dirList.reduce(computeScore, 0);

// Part two
let Max = 70000000;
let tobeUnused = 30000000;
let currentlyUsed = Root.size;
let currentlyUnused = Max - currentlyUsed;
let tobeDeleted = -(currentlyUnused - tobeUnused);

let candidates = dirList.filter(dir => (dir.size >= tobeDeleted));
let sortedCandidates = candidates.sort((dirA,dirB) => dirA.size - dirB.size);
let minCandidate = sortedCandidates[0];
console.log(minCandidate.size);



function treatment(currentDirectory, element){

    if (element[0] == '$'){
        let cmd = element.split(' ');
        if (cmd[1] == 'cd' && cmd[2] != '..'){
            for (let i=0; i<currentDirectory.children.length ; i++){
                if (currentDirectory.children[i].name == cmd[2]){
                    return currentDirectory.children[i];
                }
            }
        }
        if (cmd[1] == 'cd' && cmd[2] == '..'){
            return currentDirectory.father;
        }
        return currentDirectory;

    } else {
        let exp = element.split(' ');
        let dir;
        let file;
        if (exp[0] == 'dir'){
            dir = Object.create(Directory);
            dir.name = exp[1];
            dir.father = currentDirectory;
            dir.size = 0;
            dir.children = [];
            currentDirectory.children.push(dir);
            dirList.push(dir);
        } else {
            file = Object.create(File);
            file.size = Number(exp[0]);
            file.name = exp[1];
            currentDirectory.children.push(file);
        }
        return currentDirectory;
    }    
}

function computeSize(directory){
    for (let i=0; i<directory.children.length; i++){
        if (Object.getPrototypeOf(directory.children[i]) === File){
            directory.size += directory.children[i].size;
        }
        if (Object.getPrototypeOf(directory.children[i]) === Directory){
            directory.size += computeSize(directory.children[i]);
        }
    }
    return directory.size;
}

function computeScore(score, directory){
    if (directory.size <= 100000){
        score += directory.size;
    }
    return score;
}