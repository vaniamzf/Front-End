const regOperAll = /[\+\-\*\/]/g;
const operators = "/+-*";

const display = document.querySelector("#display");
let eq = '';


document.querySelectorAll(".num, .oper").forEach(b => {
    b.addEventListener("click", () => {
        appendChar(b.textContent);
    });
});


document.querySelector("#bs").addEventListener("click", delChar);


document.querySelector("#cls").addEventListener("click", clear);


document.querySelector("#eval").addEventListener("click", displayResults);


window.addEventListener("keydown", k => {
    if(k.key.match(/[0-9/*+-.]/)) {
        appendChar(k.key);
        if(k.key === "/") k.preventDefault();
        return;
    }

    switch(k.key) {
        case "Backspace":
            delChar();
            break;
        case "=":
        case "Enter":
            displayResults();
            break;
        case "Delete":
        case "c":
        case "C":
        case "Escape":
            clear();
    }
});



function displayResults() {
    if(eq.slice(-1).match(regOperAll)) return;

    eq = calc(eq);
    updateDisplay(eq);
}


function clear() {
    eq = "";
    updateDisplay(eq);
}


function calc(input) {
    let preNums = input.match(/-?\d*\.?\d*[/*]?/g);

    const finalNums = preNums.map( (n, i) => {
        const nextNum = (index) => {
            const num = preNums[index];
            const last = num.slice(-1);

            if(last !== "*" && last !== "/") return num;

            const cNum = num.slice(0,-1);
            const nNum = nextNum(index+1);
            if(index < preNums.length-1) preNums[index+1] = "0";

            if(last === "*") {
                return String(Number(cNum) * Number(nNum));
            }
            if(last === "/") {
                return String(Number(cNum) / Number(nNum));
            }
        };

        return nextNum(i);
    });

    return String(finalNums.reduce((a,c) => Number(a)+Number(c)));
}


function punctualize(equation) {
    let nums = equation.split(regOperAll);
    let ops = equation.match(regOperAll);

    nums = nums.map(string => {
        if(string.length === 0) return string;
        if( isNaN(string) ) {
            if(string==='.') return '.';
            else return "ERROR";
        }

        let sides = string.split('.');
        let left = sides[0];
        let right = '';
        if (sides.length === 2) right = '.' + sides[1];

        for(i = left.length-3; i > 0; i -= 3) {
            left = left.slice(0, i) + ',' + left.slice(i);
        }

        return right.length === 0 ? left : left + right;
    });

    let j=0;
    return nums.reduce((a, s) => a + ops[j++] + s);
}


function addDot(string) {
    let i = string.length;
    do {
        i--;
    } while( ! operators.includes(string[i]) && i > 0 );

    if( string.slice(i).includes('.') ) return false;

    return true;
}


function addZero(string) {
    let i = string.length;
    do {
        i--;
    } while( ! operators.includes(string[i]) && i > 0 );

    const slice = string.slice(i);
    if( slice.includes('.') ||
      !(slice.match(/[\*\/\.\+]0/) && slice.length === 2) )
    {
        return true;
    }

    return false;
}


function updateDisplay(string) {
    display.textContent = punctualize(string);
}


function appendChar(c) {
    if(operators.includes(c)) {
        let last = eq.slice(-1);
        if(operators.includes(last)) {
            if(c==='-' && last==='-' || c!=='-') return;
        }
    }
    if(c === '.') {
        if( ! addDot(eq) ) return;
    }
    if(c === '0') {
        if( ! addZero(eq) ) return;
    }

    if(eq === '0' && c !== '.') eq = '';
    eq += c;
    updateDisplay(eq);
}


function delChar() {
    eq = eq.slice(0, eq.length - 1);
    updateDisplay(eq);
}