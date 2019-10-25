"use strict";

// make an operation depending on the operator
const operate = (operator, a, b) => {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "÷":
            return a / b;
        case "×":
            return a * b;
        default:
            return;
    }
};

// Updates the display in the html.
const updateDisplay = () => {
    document.querySelector(".display").innerHTML = displayText;
};

const showError = () => {
    // TODO: Make this.
};

const getResult = () => {

    // Split displayText into operands.
    const operands = displayText
        .split(/(\+|-|÷|×)/)
        .map(elem => (isNaN(elem) ? elem : Number(elem)));

    console.log(operands);

    
    // Divide operands into terms
    let terms = [];
    let termStart = 0;

    for (let i = 0; i < operands.length; i++) {
        if (operands[i] === "+" || operands[i] === "-") {
            terms.push(operands.slice(termStart, i));
            terms.push(operands[i]);
            termStart = i + 1;
        } else if (i === operands.length - 1) {
            terms.push(operands.slice(termStart, i + 1));
        }
    }
    console.log(terms);
};

// Holds what is displayed.
let displayText = "";

document.querySelectorAll(".keypad button").forEach(elem => {
    if (displayText.length < 10) {
        switch (elem.dataset.key) {
            case "=":
                elem.addEventListener("click", () => {
                    getResult();
                    console.log({ displayText });
                });
                break;

            case "C":
                elem.addEventListener("click", () => {
                    displayText = "";
                    updateDisplay();
                });
                break;

            default:
                elem.addEventListener("click", event => {
                    displayText = displayText.concat(event.target.dataset.key);
                    updateDisplay();
                });
                break;
        }
    }
});
