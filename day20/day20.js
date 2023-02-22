var fs = require('fs');
var ipt = fs.readFileSync("input20.txt", 'utf8').split('\n').map(Number);

let hash = ipt.map ((value, index) => [value, index]);


for (let i=0; i<hash.length; i++){
    console.log(hash);
    let [currentValue, oldIndex] = hash[i];
    let newIndex = currentValue + oldIndex;

    // compute the new index
    if (newIndex >= hash.length){
        newIndex = (newIndex + 1) % hash.length;
    }
    if (newIndex < 0){
        newIndex = ((newIndex-1)%hash.length) + hash.length;
    }

    // postive move
    if (currentValue >= 0){
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
    // negative move
    else {
        if (newIndex < oldIndex){
            for (let j=0; j<hash.length; j++){
                if (hash[j][1]>=newIndex && hash[j][1]<oldIndex){
                    let index = hash[j][1] + 1;
                    hash[j][1] = index;
                }
            }
            hash[i][1] = newIndex;
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
    }
}
console.log(hash);