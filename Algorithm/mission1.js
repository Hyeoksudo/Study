const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const multiColor = input.pop();
// 곱 값 저장
const value = {
    black : 0,
    brown : 1,
    red : 2,
    orange : 3,
    yellow : 4,
    green : 5,
    blue : 6,
    violet : 7,
    grey : 8,
    white : 9
};
const multi = {
    black : 1,
    brown : 10,
    red : 100,
    orange : 1000,
    yellow : 10000,
    green : 100000,
    blue : 1000000,
    violet : 10000000,
    grey : 100000000,
    white : 1000000000
};

function resiCal(array) {
    const strValue = [];
    array.map((color) => {
        strValue.push(value[color]);
    });
    const numValue = Number(strValue.join(""));
    return numValue * multi[multiColor];
}

console.log(resiCal(input));