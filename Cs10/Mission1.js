// Mission 1 - 1
function andGate(bitA, bitB) {
    if(bitA && bitB) {
        return true;
    };
    return false;
};

function orGate(bitA, bitB) {
    if(bitA || bitB) {
        return true;
    };
    return false;
};

function notAndGate(bitA, bitB) {
    if(bitA && bitB) {
        return false;
    };
    return true;
};

function xorGate(bitA,bitB) {
    if(bitA != bitB) {
        return true;
    };
    return false;
};

// Mission 1 - 2
function half_Adder(bitA, bitB) {
    function calCarry() {
        return andGate(bitA, bitB)
    };
    function calSum() {
        return xorGate(bitA, bitB)
    };
    return [calCarry(), calSum()];
};

function full_Adder(bitA, bitB, carry) {
    const half_add = half_Adder(bitA,bitB);
    if(carry) {
        const half_add_carry = half_add[0];
        const half_add_sum = half_add[1];
        function calCarry() {
            return orGate(andGate(half_add_carry,carry),half_add_sum);
        };
        function calSum() {
            return xorGate(half_add_sum,carry);
        };
        return [calCarry(), calSum()];
    };
    return half_add;
};

// Mission 1 - 3
const byte1 = [true, true, false, true, true, false, true, false];
const byte2 = [true, false, true, true, false, false, true, true];
const byte3 = [true, true, false, true, false, true]
const byte4 = [true, false, true, true]

function byte_Adder(byteA, byteB) {
    if(byteA.length != byteB.length) {
        return lengthAdder(byteA,byteB);
    }
    let result = [];
    for(let i = 0; 0 <= i; i++) {
        if(byteA.length <= i) {
            return result;
        };
        if(result.length === 0) {
            result = result.concat(full_Adder(byteA[i],byteB[i]))
            i++;
        };
        result.unshift(...full_Adder(byteA[i],byteB[i],result.shift()));
    };
};

function lengthAdder(byteA,byteB) {
    if(byteA.length < byteB.length) {
        while(byteA.length < byteB.length) {
            byteA.push(false)
        };
        return byte_Adder(byteA,byteB);
    } else {
        while(byteB.length < byteA.length) {
            byteB.push(false)
        };
        return byte_Adder(byteA,byteB);
    };
}