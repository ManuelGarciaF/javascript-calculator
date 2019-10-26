"use strict";

// make an operation depending on the operator
const operate = (operator, a, b) => {
    switch (operator) {
        case "+":
            return Number(a) + Number(b);
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
    displayText = "Err0r";
    updateDisplay();
};

const getResult = () => {
    // Use recursion to compute a term.
    const operateRecursive = arr =>
        arr.length === 1
            ? arr
            : operate(arr[1], Number(arr[0]), operateRecursive(arr.slice(2)));

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

    let termsReduced = [];

    // Do the multiplication and division.
    terms.forEach(elem =>
        termsReduced.push(
            elem === "+" || elem === "-" ? elem : operateRecursive(elem)
        )
    );

    // Make sure no elements are in an array of 1 item (Example: [1])
    termsReduced = termsReduced.map(elem =>
        typeof elem === "object" && elem.length === 1 ? elem[0] : elem
    );

    // Do the addition and subtraction and round to 2 decimals.
    const finalResult = Number(operateRecursive(termsReduced)).toFixed(2);

    console.log({ finalResult });

    if (finalResult === "Infinity") {
        console.log("divided by 0");
        showError();
        return;
    }

    displayText = finalResult;
    updateDisplay();
};

// Holds what is displayed.
let displayText = "";

let needsClear = false;

document.querySelectorAll(".keypad button").forEach(elem => {
    switch (elem.dataset.key) {
        case "=":
            elem.addEventListener("click", () => {
                getResult();
                console.log({ displayText });
                needsClear = true;
            });
            break;

        case "C":
            elem.addEventListener("click", () => {
                displayText = "";
                updateDisplay();
                needsClear = false;
            });
            break;

        default:
            elem.addEventListener("click", event => {
                if (!needsClear) {
                    displayText = displayText.concat(event.target.dataset.key);
                    updateDisplay();
                }
            });
            break;
    }
});
