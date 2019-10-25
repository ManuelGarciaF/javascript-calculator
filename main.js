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
    // TODO: Finish this.
};

const getResult = () => {
    const calculate = arr => {
        console.log(arr.length);
        for (let i = 0, len = arr.length; i < len; i++) {
            if (
                arr[i] !== "+" &&
                arr[i] !== "-" &&
                arr[i] !== "÷" &&
                arr[i] !== "×"
            ) {
                console.log("continued...")
                continue;
            }

            let numA = arr[i - 1];
            let operator = arr[i];
            let numB = arr[i + 1];

            arr[i + 1] = operate(operator, numA, numB);
            arr.shift();
            arr.shift();
            console.log(arr);
            console.log({ i })
        }
        return arr;
    };

    const operations = displayText
        .split(/(\+|-|÷|×)/)
        .map(elem => (isNaN(elem) ? elem : Number(elem)));

    console.log(operations);

    calculate(operations);
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
