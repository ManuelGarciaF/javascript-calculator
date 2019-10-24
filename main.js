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

const updateDisplay = () => {
    document.querySelector(".display").innerHTML = displayText.join("");
};

const getResult = () => {
    let parsed = [];
    let currentNumber = "";

    displayText.forEach(elem => {
        if (elem === "+" || elem === "-" || elem === "÷" || elem === "×") {
            if (currentNumber) {
                parsed.push(Number(currentNumber));
                currentNumber = "";
            }

            parsed.push(elem);
        } else {
            currentNumber = currentNumber.concat(elem);
        }
    });
};

let displayText = [];

document.querySelectorAll(".keypad button").forEach(elem => {
    if (displayText.length < 10) {
        switch (elem.dataset.key) {
            case "=":
                elem.addEventListener("click", () => {
                    console.log({ displayText });
                    getResult();
                });
                break;

            case "C":
                elem.addEventListener("click", () => {
                    displayText = [];
                    updateDisplay();
                });
                break;

            default:
                elem.addEventListener("click", event => {
                    displayText.push(event.target.dataset.key);
                    updateDisplay();
                });
                break;
        }
    }
});
