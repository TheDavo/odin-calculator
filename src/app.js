let currentResult = 0; //Actual number result
let currentInput = document.getElementById('input'); // String input from calculator
/* Initialize buttons with event listeners */
const numbers = document.querySelectorAll('.buttons .number');
const totalInput = document.querySelector('#total-input');
const currentTotal = document.querySelector('#current-total');

let lhs = false; // left-hand-side
let lhsValue = 0;
// let rhs = false; // right-hand-side
// let rhsValue = 0;

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

function updateCalculator(operator) {
  totalInput.innerText = totalInput.innerText.concat(
    ' ',
    currentInput.innerText,
    `${operator}`
  );
  currentInput.innerText = '0';
  currentTotal.innerText = currentResult;
}

/* Bind math functions to unique buttons */
const buttonAdd = document.querySelector('#buttonAdd');
buttonAdd.addEventListener('click', () => {
  // if (lhs) {
  //   currentResult = add(lhsValue, parseFloat(currentInput.innerText));
  //   console.log(currentResult);
  //   updateCalculator('+');
  // } else {
  //   lhs = true;
  //   lhsValue = parseFloat(currentInput.innerText);
  //   updateCalculator('+');
  // }
});

const buttonSubtract = document.querySelector('#buttonSubtract');
buttonSubtract.addEventListener('click', () => {});

/* Bing non-math functions */
const buttonAC = document.querySelector('#buttonAC');
buttonAC.addEventListener('click', () => {
  currentResult = 0;
  currentInput.innerText = '0';
  currentTotal.innerText = '0';
  totalInput.innerText = '';
  lhs = false;
});
