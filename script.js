let firstOperand = "";
let secondOperand = "";
let resultOperation = null;
let shouldResetScreen = false;

// Basic math operators
const add = function (x, y) {
  return x + y;
};

const subtract = function (x, y) {
  return x - y;
};

const multiply = function (x, y) {
  return x * y;
};

const divide = function (x, y) {
  return x / y;
};

const numBtn = document.querySelectorAll("[data-number]");
const opBtn = document.querySelectorAll("[data-operator]");
const cBtn = document.getElementById("cBtn");
const posNegBtn = document.getElementById("posNegBtn");
const delBtn = document.getElementById("delBtn");
const equalsBtn = document.getElementById("equalsBtn");
const pointBtn = document.getElementById("pointBtn");
const operationScreen = document.getElementById("operationScreen");
const resultScreen = document.getElementById("resultScreen");

window.addEventListener("keydown", keyboardInput);
equalsBtn.addEventListener("click", evaluate);
cBtn.addEventListener("click", clear);
delBtn.addEventListener("click", deleteNumber);
pointBtn.addEventListener("click", appendPoint);

numBtn.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

opBtn.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

function appendNumber(number) {
  if (resultScreen.textContent === 0 || shouldResetScreen) resetScreen();
  resultScreen.textContent += number;
}

function resetScreen() {
  resultScreen.textContent = "";
  shouldResetScreen = false;
}

function clear() {
  resultScreen.textContent = "";
  operationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  resultOperation = null;
}

function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (resultScreen.textContent === "") resultScreen.textContent = "0";
  if (resultScreen.textContent.includes("."))
    return (resultScreen.textContent += ".");
}

function deleteNumber() {
  resultScreen.textContent = resetScreen.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
  if (resultOperation !== null) evaluate();
  firstOperand = resultScreen.textContent;
  resultOperation = operator;
  operationScreen.textContent = `${firstOperand} ${resultOperation}`;
  shouldResetScreen = true;
}

function evaluate() {
  if (resultOperation === null || shouldResetScreen) return;
  if (resultOperation === "÷" && resultScreen.textContent === "0") {
    alert("ERROR");
    return;
  }
  secondOperand = resultScreen.textContent;
  resultScreen.textContent = roundResult(
    operate(resultOperation, firstOperand, secondOperand)
  );
  operationScreen.textContent = `${firstOperand} ${resultOperation} ${secondOperand} =`;
  resultOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function keyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  if (e.key === "/" || e.key === "*" || e.key === "-" || e.key === "+")
    setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "−";
  if (keyboardOperator === "+") return "+";
}

function operate(operator, x, y) {
  x = Number(x);
  y = Number(y);
  switch (operator) {
    case "÷":
      if (y === 0) return null;
      else return divide(x, y);
    case "×":
      return multiply(x, y);
    case "−":
      return subtract(x, y);
    case "+":
      return add(x, y);
  }
}
