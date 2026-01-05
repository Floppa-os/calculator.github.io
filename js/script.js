const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function inputNumber(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = '';
        resetScreen = false;
    }
    currentInput += number;
}

function inputDecimal() {
    if (!currentInput.includes('.') && !resetScreen) {
        currentInput += '.';
    } else if (resetScreen) {
        currentInput = '0.';
        resetScreen = false;
    }
}

function clear() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function chooseOperation(op) {
    if (operation !== null && !resetScreen) calculate();
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }

    currentInput = computation.toString();
    operation = null;
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const number = button.dataset.num;
        const operator = button.dataset.op;

        if (action === 'clear') {
            clear();
            return;
        }

        if (action === 'equals') {
            calculate();
            return;
        }

        if (number) inputNumber(number);
        if (operator) chooseOperation(operator);
        if (number === '.') inputDecimal();

        updateDisplay();
    });
});
