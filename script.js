const add = function(a, b) {
    return a + b;
  };
  
const subtract = function(a, b) {
    return a - b;
};

const multiply = function(a, b) {
    return a * b;
  };
  
const divide = function(a, b) {
    return a / b;
};

function operate(a, b, operator) {
    if (isNaN(a) || isNaN (b)) return 0;
    switch (operator) {
        case 'plus':
            return add(a, b);
        case 'minus':
            return subtract(a, b);
        case 'times':
            return multiply(a, b);
        case 'divide':
            if (b == 0) {
                alert ("How dare you try to divide by 0! I thought you knew better.");
                return 0;
            } else return divide(a, b);
        default:
            alert("Invalid operator");
    }
}

let a = NaN,
    b = NaN,
    operator = null,
    displayValue = 0;

function updateScreen(number) {
    const display = document.getElementById("screen");
    display.textContent = number;
    // if (!(number == '0' && displayValue.length == 0)) {
    //     displayValue.push(number);
    //     display.textContent = displayValue.join("");
    // } else {
    //     display.textContent = "0";
    // }
    console.log(a, b, operator, displayValue);
}

function resetScreen() {
    a = NaN;
    b = NaN;
    operator = null;
    displayValue = 0;
    updateScreen(displayValue);
}

function createCalcNums() {
    const numDiv = document.getElementById("numbers");
    const num = document.createElement("button");
    for (let i = 0; i <= 9; i++){
        const clone = num.cloneNode();
        clone.textContent = `${i}`;
        clone.id = `${i}`;
        clone.addEventListener("click", () => {
            displayValue = displayValue * 10 + Number(clone.id);
            updateScreen(displayValue);
        });
        numDiv.appendChild(clone);
    }
    resetScreen();
}

createCalcNums();

const clear = document.getElementById("clear");
const equals = document.getElementById("equals");

clear.addEventListener("click", () => {
    resetScreen();
});

const operators = ['plus', 'minus', 'times', 'divide'];
operators.forEach(function (operand) {
    document.getElementById(operand).addEventListener("click", () => {
        if (isNaN(a)) {
            operator = operand;
            a = displayValue;
            displayValue = 0;
        } else {
            b = displayValue;
            displayValue = 0;
            const result = operate(a, b, operator);
            updateScreen(result);
            a = result;
            operator = operand;
            displayValue = 0;
        }
        
    });
});

equals.addEventListener("click", () => {
    b = displayValue;
    displayValue = 0;
    const result = operate(a, b, operator);
    updateScreen(result);
    a = result;
});