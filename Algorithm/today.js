function twosum(array,target) {
    return cutArray(array,target)
}


function cutArray(num,num2) {
    let nums = [];
    let indexs = [];
    num.forEach((el,index) => {
        if(el <= num2) {
            nums.push(el);
            indexs.push(index);
        }
    });
    return cal(nums,indexs,num2);
}

function cal(array1,array2,tar) {
    let num = array1
    let index = array2
    let target = tar;
    for(let i = 0; i < num.length; i++) {
        let result = target - num[i];
        let nums = i + 1;
        if(num[nums] === result) {
            return [index[i],index[nums]];
        };
    };
}

//   mission1

var reverse = function(x) {
    if(x < 0) {
        let num = String(Math.abs(x)).split("")
        let isMinus = true;
        num = Number(num.reverse().join(""));
        return cal(num,isMinus);
    }
    let num = String(x).split("");
    num = Number(num.reverse().join(""));
    return cal(num);
};

var cal = function(number,minus) {
    let num = number;
    if(minus) {
        num = num * -1;
    }
    let bigger = Math.pow(2,31);
    let smaller = Math.pow(-2,31);
    if(num < smaller || num > bigger) {
        return 0;
    }
    return num;
}

// missin2

var deleteDuplicates = function(head) {
    let array = head.length;
    let headNode = head[0];
    let lastNode = head[head.length - 1];
    let result = [headNode];
    for(let i = 0; i < array; i++) {
        if(head[i + 1] === lastNode) {
            break;
        }
        let nextNode = head[i + 1];
        if(head[i] != nextNode) {
            result.push(nextNode);
        }
    };
    result.push(lastNode);
    return result;
};
//틀림

var deleteDuplicates = function (head) {
    let current = head;
  
    while (current !== null && current.next !== null) {
      if (current.val === current.next.val) {
        current.next = current.next.next;
      } else {
        current = current.next;
      }
    }
  
    return head;
  }; 

// 참조 코드

var deleteDuplicates = function(head) {
    let result = head;
    while(result.val !== 0 &&result.next !== null) {
        if(result.val === result.next.val) {
            result.next = result.next.next;
        } else {
            result = result.next;
        }
    }
    return head;
};

// 내 코드

//mission 3

var isPalindrome = function(x) {
    if(x < 0) {
        return false;
    }
    let num = String(x).split("");
    num = Number(num.reverse().join(""));
    if(num === x) {
        return true;
    }
    return false;
};

//


// const longestCommonPrefix = (strs) => { // strs: array
// 	if (strs.length === 0) return '';

// 	const [firstString, ...restStrs] = strs; // destructuring
//   // firstStirng: string, restStrs: array
// 	let result = '';

// 	for (let [index, char] of [...firstString].entries()) { // turn firstString into array to use entries() method, which returns [[index, element] ... ]
// 		const isValid = restStrs.every((restStr) => restStr[index] === char);

// 		if (isValid) result += char;
// 		else return result;	
// 	}

// 	return result; // in case every single character is included in the rest strings array
// }

// longestCommonPrefix(["flower","flow","flight"])

var longestCommonPrefix = function(strs) {
    if(strs.length === 0) return "";
    const arr = strs.sort((a,b) => a.length - b.length);
    const [word,...target] = arr;
    
    let result = "";
    
    for(let [index,el] of [...word].entries()) {
        let istrue = target.every(str => str[index] === el);
        if(istrue) result += el;
        else return result;
    }
    return result;
};
let a = ["a"]
longestCommonPrefix(a)

// every(), entries, sort(), 등을 공부하였다. 배열을 나눠서 선언하는 법도 알았다.
