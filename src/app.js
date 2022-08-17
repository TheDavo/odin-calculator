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

const buttonAdd = document.querySelector('#buttonAdd');
buttonAdd.addEventListener('click', function () {
  latestOperator = 'add';
  if (typeof history[history.length - 1] != 'number') {
    history.push(parseFloat(currentInput.innerText));
  }

  history.push(latestOperator);
  doMathAndUpdate();
});

const buttonSubtract = document.querySelector('#buttonSubtract');
buttonSubtract.addEventListener('click', function () {
  latestOperator = 'subtract';

  if (typeof history[history.length - 1] != 'number') {
    history.push(parseFloat(currentInput.innerText));
  }
  history.push(latestOperator);

  doMathAndUpdate();
});

const buttonMultiply = document.querySelector('#buttonMultiply');
buttonMultiply.addEventListener('click', function () {
  latestOperator = 'multiply';
  if (typeof history[history.length - 1] != 'number') {
    history.push(parseFloat(currentInput.innerText));
  }
  history.push(latestOperator);

  doMathAndUpdate();
});

const buttonDivide = document.querySelector('#buttonDivide');
buttonDivide.addEventListener('click', function () {
  latestOperator = 'divide';
  if (typeof history[history.length - 1] != 'number') {
    history.push(parseFloat(currentInput.innerText));
  }
  history.push(latestOperator);

  doMathAndUpdate();
});

const buttonCompute = document.querySelector('#buttonCompute');
buttonCompute.addEventListener('click', function () {
  if (typeof history[history.length - 1] != 'number') {
    history.push(parseFloat(currentInput.innerText));
  }
  doMathAndUpdate();
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

const canDoMath = function () {
  return lhs != null && rhs != null;
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
  lhs = null;
  rhs = null;
  history = [];
});
