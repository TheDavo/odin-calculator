let currentResult = 0; //Actual number result

/* Initialize buttons with event listeners */
let currentInput = document.getElementById('input'); // String input from calculator
const numbers = document.querySelectorAll('.buttons .number');
const totalInputDisplay = document.querySelector('#total-input');
const currentTotalDisplay = document.querySelector('#current-total');
const historyTableBody = document.querySelector('#history-table-body');

const maxLength = 10;
let latestOperator = '';
let history = [];
let fullHistory = [];
let hasDecimal = false;
const operators = {
  add: '+',
  subtract: '-',
  divide: '/',
  multiply: 'x',
  equal: '=',
};

for (let number of numbers) {
  number.addEventListener('click', (event) => {
    if (currentInput.innerText.length <= maxLength) {
      if (currentInput.innerText === '0') {
        currentInput.innerText = event.target.innerText;
      } else {
        currentInput.innerText = currentInput.innerText.concat(
          event.target.innerText
        );
      }
    } else {
      alert('Max Number Limit Reached');
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
  fullHistory.push({
    calculation: history,
    result: parseFloat(currentTotalDisplay.innerText),
  });
  addNewCalculationToTable();
  resetCalculator();
});

const buttonDel = document.querySelector('#buttonDel');
buttonDel.addEventListener('click', () => {
  history.pop();
  updateCalculatorDisplay(latestOperator);
});

const buttonDecimal = document.querySelector('#buttonDecimal');
buttonDecimal.addEventListener('click', () => {
  if (!hasDecimal) {
    currentInput.innerText = currentInput.innerText.concat('.');
    hasDecimal = true;
  }
});

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
  updateCalculatorDisplay();
};

/* NON-MATH FUNCTIONS */
const buttonAC = document.querySelector('#buttonAC');
buttonAC.addEventListener('click', () => {
  resetCalculator();
});

const updateCalculatorDisplay = function () {
  totalInputDisplay.innerText = getHistoryInStr();
  currentInput.innerText = '0';
  hasDecimal = false;
  currentTotalDisplay.innerText = currentResult;
};

const getHistoryInStr = function () {
  let resStr = '';
  for (let input of history) {
    resStr = resStr.concat(input, ' ');
  }

  return resStr;
};

const getHistory = function (history) {
  let resStr = '';
  for (let input of history) {
    resStr = resStr.concat(input, ' ');
  }

  return resStr;
};

const resetCalculator = function () {
  currentResult = 0;
  currentInput.innerText = '0';
  currentTotalDisplay.innerText = '0';
  totalInputDisplay.innerText = '';
  history = [];
};

/* TABLE FUNCTION */

const addNewCalculationToTable = function () {
  const newRow = document.createElement('tr');
  historyTableBody.appendChild(newRow);
  const calculation = getHistory(
    fullHistory[fullHistory.length - 1].calculation
  );
  const result = fullHistory[fullHistory.length - 1].result;

  const calcTd = document.createElement('td');
  calcTd.innerText = calculation;

  const resultTd = document.createElement('td');
  resultTd.innerText = result;

  newRow.appendChild(calcTd);
  newRow.appendChild(resultTd);
};
