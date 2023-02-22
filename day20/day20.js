var fs = require('fs');
var ipt = fs.readFileSync("input20.txt", 'utf8').split('\n').map(Number);

let hash = ipt.map ((value, index) => [value, index]);
let mult = 811589153;
hash.forEach(element => {
    element[0] = mult * element[0];
})
let row = 10;

for (let k=0; k<row; k++){
    for (let i=0; i<hash.length; i++){
        let [currentValue, oldIndex] = hash[i];
        let newIndex = (currentValue%(hash.length - 1) + oldIndex);
    
        // compute the new index
        if (newIndex >= hash.length){
            newIndex = (newIndex) % (hash.length-1);
        }
        if (newIndex <= 0){
            newIndex = ((newIndex- 1 + hash.length)% (hash.length-1))
    
        }
        if (oldIndex < newIndex){
            for (let j=0; j<hash.length; j++){
                if (hash[j][1]>oldIndex && hash[j][1]<=newIndex){
                    let index = hash[j][1] -1;
                    hash[j][1] = index;
                }
            }
            hash[i][1] = newIndex;
        }
        if (oldIndex > newIndex){
            for (let j=0; j<hash.length; j++){
                if (hash[j][1]>= newIndex && hash[j][1] <oldIndex){
                    let index = hash[j][1] + 1;
                    hash[j][1] = index;
                }
            }
            hash[i][1] = newIndex;
        }
    }
}

// Find zero

let indexZero = hash.filter((value) => (value[0] == 0))[0][1];
let First = (indexZero+1000)%hash.length;
let Second = (indexZero+2000)%hash.length;
let Third = (indexZero+3000)%hash.length;

hash.sort( (a,b) => a[1]-b[1]);

let sum = hash[First][0] + hash[Second][0] + hash[Third][0];
console.log(sum);
