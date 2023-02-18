var fs = require('fs');
var path = require('path');
var ipt = fs.readFileSync("input-13.txt", 'utf8').split('\n\n');

// parsing
let data = ipt.map(element => element.split("\n"));

let treatedInputs = data.map(treatment);

let boolArray = treatedInputs.map(element => compare(element[0], element[1]));

let Sum = boolArray.reduce(indexTrue,0);

console.log(Sum);

function indexTrue(sum, currentValue, index){
    if (currentValue === true){
        sum += index + 1;
    }
    return sum;
}

function treatment(element){
    // let leftString = element[0];
    // let rightString = element[1];

    
    let left = JSON.parse(element[0]);
    let right = JSON.parse(element[1]);

    return [toArray(element[0],[],1)[1], toArray(element[1],[],1)[1]] ;
    // return [left, right]
}


function toArray(string, array, index){
    let ret;
    if (string.charAt(index) == ','){
        return toArray(string, array, index + 1);
    }
    if (string.charAt(index) != ',' &&
        string.charAt(index) != '[' &&
        string.charAt(index) != ']'){
            let conc = '';
            let ind = index;
            while(string.charAt(ind) != ',' &&
            string.charAt(ind) != '[' &&
            string.charAt(ind) != ']'){
                conc = conc.concat(string.charAt(index));
                ind += 1;
            }
            array.push(Number(conc));
            return toArray(string, array, index + 1);
        }
    
    if (string.charAt(index) == '['){
        newArray = [];
        ret = toArray(string, newArray, index + 1);
        string = ret[0];
        array.push(ret[1]);
        index = ret[2];
        return toArray(string, array, index + 1);
    }

    if (string.charAt(index) == ']'){
        return [string, array, index];
    }
}


function compare(left, right){

    if (typeof left === 'number' && typeof right === 'number'){
        if (left < right){
            return true;
        }
        if (left > right){
            return false;
        }
        if (left === right){
            return 0;
        }
    }

    if (typeof left !== 'number' && typeof right !== 'number'){
        let len;
        let leftSmaller;
        let ret;
        if (left.length < right.length){
            leftSmaller = true;
            len = left.length;
        }
        if ( left.length > right.length){
            leftSmaller = false;
            len = right.length;
        }
        if (left.length === right.length){
            leftSmaller = 0;
            len = left.length;
        }
        for (let i=0; i<len; i++){
            ret = compare(left[i],right[i])
            if (typeof ret === 'boolean'){
                return ret;
            }
        }
        return leftSmaller;
    }

    if (typeof left === 'number'){
        return compare([left], right);
    }

    if (typeof right === 'number'){
        return compare(left,[right]);
    }

}

