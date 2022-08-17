let currentResult = 0; //Actual number result
let currentInput = document.getElementById('input'); // String input from calculator

/* Initialize buttons with event listeners */
const numbers = document.querySelectorAll('.buttons .number');
const totalInputDisplay = document.querySelector('#total-input');
const currentTotalDisplay = document.querySelector('#current-total');

let lhs = null;
let rhs = null;
let latestOperator = '';

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

const updateCalculator = function (operator) {
  if (canDoMath()) {
    totalInputDisplay.innerText = totalInputDisplay.innerText.concat(
      ' ',
      currentInput.innerText,
      ' ',
      `${operators[operator]}`
    );
  }
  // else {
  //   if (lhs != null && rhs == null) {
  //     totalInputDisplay.innerText = ''.concat(
  //       lhs,
  //       ' ',
  //       totalInputDisplay.innerText.replace(operators[latestOperator], operator)
  //     );
  //   }
  // }
  currentInput.innerText = '0';
  currentTotalDisplay.innerText = currentResult;
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
  if (canDoMath()) {
    currentResult = doMath(operator, lhs, rhs);
    lhs = currentResult;
    rhs = null;
  } else {
    const curIn = parseFloat(currentInput.innerText);
    if (lhs == null) {
      lhs = curIn;
    } else if (rhs == null) {
      if (curIn === 0) {
        updateCalculator(operator);
        return;
      }
      rhs = curIn;
      currentResult = doMath(operator, lhs, rhs);
      lhs = currentResult;
      rhs = null;
    }
  }
  updateCalculator(operator);
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
});
