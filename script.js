const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".div-btn");
buttons.forEach((button) => button.addEventListener("click", handleClick));
function handleClick(event) {
    switch (event.target.innerText) {
        case "AC":
            clear();
            currentState = states.OP1_INIT;
            break;
        case "=":
            // calculateResult();
            handleState(currentState, "=");
            break;
        case "+/-":
            toggleSign();
            break;
        case "%":
            calculatePercentage();
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            handleState(currentState, "operator", null, event.target.innerText);
            // handleOperator(event.target.innerText);
            break;
        case ",": // TODO: Implement floating point support
            break;
        default:
            console.log("handleClick send num to state.");
            handleState(currentState, "num", event.target.innerText);
        //handleInput(event.target.innerText);
    }
}

const states = {
    OP1_INIT: "op1_init",
    OP1: "op1",
    OP2_INIT: "op2_init",
    OP2: "op2",
};

let currentState = states.OP1_INIT;

const handleState = (currState, choice, num = null, operator = null) => {
    switch (currState) {
        case "op1_init":
            if (choice === "num") {
                console.log(
                    `currentState: ${currState}, next state: ${states.OP1}`
                );
                calcObj.num1 = Number(num);
                updateDisplay();
                currentState = states.OP1;
            }
            if (choice === "operator") {
                console.log(`Moving to OP2_INIT with OP1: ${calcObj.num1}`);
                calcObj.operator = operator;
                currentState = states.OP2_INIT;
            }
            if (choice === "=") {
                console.log("Clear and go back to OP1_INIT");
                clear();
                currentState = states.OP1_INIT;
            }
            break;
        case "op1":
            if (choice === "num") {
                calcObj.num1 = Number(calcObj.num1 + num);
                console.log(`currentState: ${currState}, OP1: ${calcObj.num1}`);
                updateDisplay();
            }
            if (choice === "operator") {
                console.log(
                    `currentState: ${currState}, next state: ${states.OP2_INIT}`
                );
                calcObj.operator = operator;
                currentState = states.OP2_INIT;
            }
            if (choice === "=") {
                console.log("Clear and go back to OP1_INIT");
                clear();
                currentState = states.OP1_INIT;
            }
            break;
        case "op2_init":
            if (choice === "num") {
                console.log(
                    `currentState: ${currState}, next state: ${states.OP2}`
                );
                calcObj.num2 = Number(num);
                updateDisplay();
                currentState = states.OP2;
            }
            if (choice === "operator") {
                calcObj.operator = operator;
            }
            if (choice === "=") {
                calcObj.num2 = calcObj.num1;
                calculateResult();
                currentState = states.OP1_INIT;
            }
            break;
        case "op2":
            if (choice === "num") {
                calcObj.num2 = Number(calcObj.num2 + num);
                console.log(`currentState: ${currState}, OP2: ${calcObj.num2}`);
                updateDisplay();
            }
            if (choice === "operator") {
                calcObj.operator = operator;
                calculateResult();
                currentState = states.OP1_INIT;
            }
            if (choice === "=") {
                calculateResult();
                currentState = states.OP1_INIT;
            }
            break;
        default:
            break;
    }
};

const errors = {
    DIV_BY_ZERO: "Divide by zero error",
};

const calcObj = {
    num1: 0,
    num2: 0,
    operator: null,
    display: () => {
        if (calcObj.num2) {
            return calcObj.num2;
        } else if (calcObj.operator) {
            return calcObj.num1 + " " + calcObj.operator;
        } else {
            return calcObj.num1;
        }
    },
};

const updateDisplay = () => {
    display.innerText = calcObj.display();
};

const clear = (op1 = null) => {
    calcObj.num1 = op1;
    calcObj.num2 = null;
    calcObj.operator = null;
    updateDisplay();
};

const toggleSign = () => {
    if (calcObj.num2) {
        calcObj.num2 *= -1;
    } else {
        calcObj.num1 *= -1;
    }
    updateDisplay();
};

const calculatePercentage = () => {
    if (calcObj.num2) {
        calcObj.num2 /= 100;
    } else {
        calcObj.num1 /= 100;
    }
    updateDisplay();
};

// const handleOperator = (operator) => {
//     if (calcObj.num1 && calcObj.num2) {
//         calculateResult();
//     }
//     if (calcObj.num1) {
//         calcObj.operator = operator;
//         updateDisplay();
//     }
// };

const calculateResult = () => {
    if (calcObj.num1 && calcObj.num2 && calcObj.operator) {
        calcObj.num1 = calculate(calcObj.operator, calcObj.num1, calcObj.num2);
        calcObj.num2 = null;
        calcObj.operator = null;
        updateDisplay();
    }
};

// const handleInput = (input) => {
//     if (calcObj.operator) {
//         if (calcObj.num2) {
//             calcObj.num2 = Number(calcObj.num2 + input);
//         } else {
//             calcObj.num2 = Number(input);
//         }
//     } else {
//         if (calcObj.num1) {
//             calcObj.num1 = Number(calcObj.num1 + input);
//         } else {
//             calcObj.num1 = Number(input);
//         }
//     }
//     updateDisplay();
// };

const calculate = (operator, num1, num2) => {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 === 0) {
                return errors[DIV_BY_ZERO];
            }
            return num1 / num2;
    }
};
