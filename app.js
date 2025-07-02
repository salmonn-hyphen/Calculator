const display = document.querySelector(".calculator-screen");
const buttons = document.querySelectorAll(".button");

let numbers = [];
let currentNumber = "";
let currentOperator = null;
let resultShown = false;

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const btnText = btn.textContent;

        if (btn.classList.contains("clear")) {
            display.value = "";
            numbers = [];
            currentNumber = "";
            currentOperator = null;
            resultShown = false;

        } else if (btn.classList.contains("delete")) {  
            display.value = display.value.slice(0, -1);
            currentNumber = currentNumber.slice(0, -1);

        } else if (btn.classList.contains("number")) {
            if (resultShown) {
                // Start new input after showing result
                display.value = "";
                currentNumber = "";
                numbers = [];
                currentOperator = null;
                resultShown = false;
            }
            currentNumber += btnText;
            display.value += btnText;

        } else if (btn.classList.contains("decimal")) {
            if (resultShown) {
                // Start new input after showing result
                display.value = "";
                currentNumber = "";
                numbers = [];
                currentOperator = null;
                resultShown = false;
            }
            if (!currentNumber.includes(".")) {
                if (currentNumber === "") {
                    currentNumber = "0.";
                    display.value += "0.";
                } else {
                    currentNumber += ".";
                    display.value += ".";
                }
            }

        } else if (btn.classList.contains("operator")) {
            // Prevent consecutive operators
            if (display.value.endsWith(" ") || display.value === "") return;

            if (currentNumber !== "") {
                numbers.push(Number(currentNumber));
                currentNumber = "";
            } else if (resultShown && numbers.length === 0) {
                numbers.push(Number(display.value));
                resultShown = false;
            }

            if (numbers.length === 2) {
                let result = operate(currentOperator, numbers);
                if (typeof result === "number" && !Number.isInteger(result)) {
                    result = +result.toFixed(8); // round to 8 decimals
                }
                display.value = result;
                numbers = [result];
                resultShown = false;
            }

            currentOperator = btnText;
            display.value += ` ${btnText} `;

        } else if (btn.classList.contains("equals")) {
            if (currentNumber !== "") {
                numbers.push(Number(currentNumber));
                currentNumber = "";
            }
            if (numbers.length < 2 || !currentOperator) return;

            let result = operate(currentOperator, numbers);
            if (typeof result === "number" && !Number.isInteger(result)) {
                result = +result.toFixed(8); // round to 8 decimals
            }
            display.value = result;

            // Prepare for next use
            numbers = [];
            currentNumber = "";
            currentOperator = null;
            resultShown = true;
        }

        adjustFontSize();
    });
});

function operate(operator, numbers) {
    switch (operator) {
        case "+":
            return add(numbers);
        case "-":
            return subtract(numbers);
        case "*":
            return multiply(numbers);
        case "/":
            return divide(numbers);
        default:
            return "Invalid";
    }
}

const add = numbers => numbers.reduce((a, b) => a + b);
const subtract = numbers => numbers.reduce((a, b) => a - b);
const multiply = numbers => numbers.reduce((a, b) => a * b);
const divide = numbers => {
    return numbers.reduce((a, b) => {
        if (b === 0) {
            display.value = "Nice try! Can't ÷ by 0";
            numbers.length = 0;
            currentNumber = "";
            currentOperator = null;
            resultShown = true;
            throw new Error("Division by zero");
        }
        return a / b;
    });
};

function adjustFontSize() {
    const textLength = display.value.length;
    if (textLength > 16) {
        display.style.fontSize = "0.9em";
    } else if (textLength > 13) {
        display.style.fontSize = "1.2em";
    } else if (textLength > 10) {
        display.style.fontSize = "1.6em";
    } else if (textLength > 7) {
        display.style.fontSize = "2.0em";
    } else {
        display.style.fontSize = "2.5em";
    }
}
