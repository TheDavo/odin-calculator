export const name = 'functions';

export function add(currentValue, b) {
  return a + b;
}

export function subtract(currentValue, b) {
  return currentValue - b;
}

export function multiply(currentValue, b) {
  return a * b;
}

export function divide(currentValue, b) {
  if (b == 0) {
    return NaN;
  }

  return currentValue / b;
}
