let currentResult = 0; //Actual number result
let currentInput = document.getElementById('input'); // String input from calculator

/* Initialize buttons with event listeners */
const numbers = document.querySelectorAll('.buttons .number');
const totalInputDisplay = document.querySelector('#total-input');
const currentTotalDisplay = document.querySelector('#current-total');

let lhs = null;
let rhs = null;
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
  doMathAndUpdate('add');
});

const buttonSubtract = document.querySelector('#buttonSubtract');
buttonSubtract.addEventListener('click', function () {
  latestOperator = 'subtract';
  doMathAndUpdate('subtract');
});

const buttonMultiply = document.querySelector('#buttonMultiply');
buttonMultiply.addEventListener('click', function () {
  latestOperator = 'multiply';
  doMathAndUpdate('multiply');
});

const buttonDivide = document.querySelector('#buttonDivide');
buttonDivide.addEventListener('click', function () {
  latestOperator = 'divide';
  doMathAndUpdate('divide');
});

const buttonCompute = document.querySelector('#buttonCompute');
buttonCompute.addEventListener('click', function () {
  if (latestOperator) {
    doMathAndUpdate(latestOperator);
  }
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

const doMathAndUpdate = function (operator) {
  const curIn = currentInput.innerText;
  if (!canDoMath()) {
    if (lhs == null) {
      lhs = parseFloat(curIn);
      latestOperator = operator;
      history.push(lhs);
    } else if (rhs == null) {
      rhs = parseFloat(curIn);
      currentResult = doMath(operator, lhs, rhs);
      history.push(operators[operator]);
      history.push(rhs);
      lhs = currentResult;
      rhs = null;
      latestOperator = operator;
    }
  }
  updateCalculatorDisplay(operator);
  console.log(history);
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
