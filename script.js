let screen = [];
let scrRes = [];

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

// // Operate function
// const operate = function (operator, x, y) {
//   if
// }

const cBtn = document.getElementById("cBtn");
const posNegBtn = document.getElementById("posNegBtn");
const percBtn = document.getElementById("percBtn");
const diviBtn = document.getElementById("diviBtn");
const multBtn = document.getElementById("multBtn");
const subsBtn = document.getElementById("subsBtn");
const addBtn = document.getElementById("addBtn");
const equalsBtn = document.getElementById("equalsBtn");
const operationScreen = document.getElementById("operationScreen");
const resultScreen = document.getElementById("resultScreen");

window.addEventListener("keydown", keyboardInput);

function keyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "/" || e.key === "*" || e.key === "-" || e.key === "+")
    setOperation(convertOperator(e.key))
}
