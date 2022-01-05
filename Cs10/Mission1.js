// Mission 1 - 1
function isAnd(bitA, bitB) {
    const answer = bitA && bitB;
    return answer;
};

function isOr(bitA, bitB) {
    const answer = bitA || bitB;
    return answer;
};

function isNotAnd(bitA, bitB) {
    const answer = !(bitA && bitB);
    return answer;
};

function isXor(bitA,bitB) {
    const answer = bitA != bitB;
    return answer;
};

// Mission 1 - 2
function addBit(bitA, bitB) {
    function calCarry() {
        return isAnd(bitA, bitB)
    };
    function calSum() {
        return isXor(bitA, bitB)
    };
    const answer = [calCarry(), calSum()];
    return answer;
};

function addBitWithCarry(bitA, bitB, carry) {
    const addBitResult = addBit(bitA,bitB);
    if(!carry) {
        return addBitResult;
    };
    const bitResultCarry = addBitResult[0];
    const bitResultSum = addBitResult[1];
    function calCarry() {
        return isOr(isAnd(bitResultCarry,carry),bitResultSum);
    };
    function calSum() {
        return isXor(bitResultSum,carry);
    };
    const answer = [calCarry(), calSum()];
    return answer;
};

// Mission 1 - 3
const byte1 = [true, true, false, true, true, false, true, false];
const byte2 = [true, false, true, true, false, false, true, true];
const byte3 = [true, true, false, true, false, true]
const byte4 = [true, false, true, true]

function addByte(byteA, byteB) {
    if(byteA.length != byteB.length) {
        return addLength(byteA,byteB);
    }
    let result = [];
    for(let i = 0; 0 <= i; i++) {
        if(byteA.length <= i) {
            return result.reverse();
        };
        if(result.length === 0) {
            result = result.concat(addBitWithCarry(byteA[i],byteB[i]))
            i++;
        };
        result.unshift(...addBitWithCarry(byteA[i],byteB[i],result.shift()));
    };
};

function addLength(byteA,byteB) {
    if(byteA.length < byteB.length) {
        while(byteA.length < byteB.length) {
            byteA.push(false)
        };
        return addByte(byteA,byteB);
    } else {
        while(byteB.length < byteA.length) {
            byteB.push(false)
        };
        return addByte(byteA,byteB);
    };
}
// Mission 2 - 1

function getdec4bin(num) {
    if(num > 255) {
        console.log("0에서 255까지의 숫자를 입력해주세요.")
        return;
    }
    dec2bin(num);
    return;
}

function dec2bin(num) {
    const result = [];
    let dec = num
    while(dec > 1) {
        if(Number.isInteger(dec/2)) {
            result.push(0)
            dec /= 2
        } else {
            result.push(1)
            dec = (dec - 1) / 2
        };
    }
    result.push(dec);
    printbin(result);
};

function printbin(result) {
    return result;
}
// mission 2 - 2

function getbin4dec(array) {
    bin2dec(array);
    return;
}

function bin2dec(array) {
    let answer = 0;
    const bin = array.reverse();
    const endPoint = bin.length - 1
    for(let i = 0; i <= endPoint; i++) {
        answer = answer * 2 + bin[i]
    }
    bin.reverse();
    return printdec(answer);
}

function printdec(result) {
    return result;
}
