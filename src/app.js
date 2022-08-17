let currentResult = 0; //Actual number result
let currentInput = document.getElementById('input'); // String input from calculator

/* Initialize buttons with event listeners */
const numbers = document.querySelectorAll('.buttons .number');
const totalInputDisplay = document.querySelector('#total-input');
const currentTotalDisplay = document.querySelector('#current-total');

let latestOperator = '';
let history = [];
const operators = {
  add: '+',
  subtract: '-',
  divide: '/',
  multiply: 'x',
  equal: '=',
};

for (let number of numbers) {
  number.addEventListener('click', (event) => {
    if (currentInput.innerText === '0') {
      currentInput.innerText = event.target.innerText;
    } else {
      currentInput.innerText = currentInput.innerText.concat(
        event.target.innerText
      );
    }
  });
}

const calcButtons = document.querySelectorAll('.function.calc');
for (let button of calcButtons) {
  button.addEventListener('click', (event) => {
    latestOperator = event.target.value;
    if (typeof history[history.length - 1] != 'number') {
      history.push(parseFloat(currentInput.innerText));
    }

    history.push(latestOperator);
    doMathAndUpdate();
  });
}

const buttonCompute = document.querySelector('#buttonCompute');
buttonCompute.addEventListener('click', function () {
  if (typeof history[history.length - 1] != 'number') {
    history.push(parseFloat(currentInput.innerText));
  }
  doMathAndUpdate();
});

const buttonDel = document.querySelector('#buttonDel');
buttonDel.addEventListener('click', () => {
  history.pop();
  updateCalculatorDisplay(latestOperator);
});

const updateCalculatorDisplay = function (operator) {
  totalInputDisplay.innerText = getHistoryInStr();
  currentInput.innerText = '0';
  currentTotalDisplay.innerText = currentResult;
};

const getHistoryInStr = function () {
  let resStr = '';
  for (let input of history) {
    resStr = resStr.concat(input, ' ');
  }

  return resStr;
};

const doMath = function (operator, lhs, rhs) {
  switch (operator) {
    case 'add':
      return add(lhs, rhs);
    case 'subtract':
      return subtract(lhs, rhs);
    case 'multiply':
      return multiply(lhs, rhs);
    case 'divide':
      return divide(lhs, rhs);
  }
};

const doMathAndUpdate = function () {
  let shouldMath = false;
  let totalResult = history[0];
  for (let input of history) {
    if (typeof input === 'string') {
      latestOperator = input;
      shouldMath = true;
    } else if (shouldMath) {
      totalResult = doMath(latestOperator, totalResult, input);
      shouldMath = false;
    }
  }

  currentResult = totalResult;
  updateCalculatorDisplay(latestOperator);
};

/* Bind non-math functions */
const buttonAC = document.querySelector('#buttonAC');
buttonAC.addEventListener('click', () => {
  currentResult = 0;
  currentInput.innerText = '0';
  currentTotalDisplay.innerText = '0';
  totalInputDisplay.innerText = '';
  history = [];
});
