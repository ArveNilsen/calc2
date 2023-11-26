const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".div-btn");
buttons.forEach((button) => button.addEventListener("click", handleClick));
function handleClick(event) {
    switch (event.target.innerText) {
        case "AC":
            clear();
            break;
        case "=":
            calculateResult();
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
            handleOperator(event.target.innerText);
            break;
        default:
            handleInput(event.target.innerText);
    }
}

const errors = {
    DIV_BY_ZERO: "Divide by zero error",
};

const calcObj = {
    num1: null,
    num2: null,
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

const clear = () => {
    calcObj.num1 = null;
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

const handleOperator = (operator) => {
    if (calcObj.num1 && calcObj.num2) {
        calculateResult();
    }
    if (calcObj.num1) {
        calcObj.operator = operator;
        updateDisplay();
    }
};

const calculateResult = () => {
    if (calcObj.num1 && calcObj.num2 && calcObj.operator) {
        calcObj.num1 = calculate(calcObj.operator, calcObj.num1, calcObj.num2);
        calcObj.num2 = null;
        calcObj.operator = null;
        updateDisplay();
    }
};

const handleInput = (input) => {
    if (calcObj.operator) {
        if (calcObj.num2) {
            calcObj.num2 = Number(calcObj.num2 + input);
        } else {
            calcObj.num2 = Number(input);
        }
    } else {
        if (calcObj.num1) {
            calcObj.num1 = Number(calcObj.num1 + input);
        } else {
            calcObj.num1 = Number(input);
        }
    }
    updateDisplay();
};

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
