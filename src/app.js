let currentResult = 0; //Actual number result
let currentInput = document.getElementById('input'); // String input from calculator
/* Initialize buttons with event listeners */
const numbers = document.querySelectorAll('.buttons .number');

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

/* Bind math functions to unique buttons */
const buttonAdd = document.querySelector('#buttonAdd');
buttonAdd.addEventListener('click', () => {
  currentResult = add(currentResult, parseFloat(currentInput.innerText));
  console.log(currentResult);
});
