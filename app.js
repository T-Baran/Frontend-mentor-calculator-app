const light = document.querySelector("#light");
const dark = document.querySelector("#dark");
const contrast = document.querySelector("#contrast");

light.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "light");
  localStorage.setItem("theme", "light");
});

dark.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
});

contrast.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "contrast");
  localStorage.setItem("theme", "contrast");
});
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    dark.checked = true;
  }
  if (currentTheme === "contrast") {
    contrast.checked = true;
  }
}
////////////////////////////////////////////////////////////////////////////////
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operator = undefined;
  }
  appendNumber(number) {
    if (number == "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand.length >= 12) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperator(operator) {
    if (this.currentOperand == "") return;
    if (this.previousOperand != "") {
      this.compute();
    }
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let previousValue = parseFloat(this.previousOperand);
    let currentValue = parseFloat(this.currentOperand);
    if (isNaN(previousValue) || isNaN(currentValue)) return;
    switch (this.operator) {
      case "+":
        this.currentOperand =
          Math.round((previousValue + currentValue) * 100) / 100;
        break;
      case "-":
        this.currentOperand =
          Math.round((previousValue - currentValue) * 100) / 100;
        break;
      case "x":
        this.currentOperand =
          Math.round(previousValue * currentValue * 100) / 100;
        break;
      case "/":
        this.currentOperand =
          Math.round((previousValue / currentValue) * 100) / 100;
        break;
      default:
        return;
    }
    this.operator = undefined;
    this.previousOperand = "";
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  differentDisplay(value) {
    let beforeDOT = parseFloat(value.toString().split(".")[0]);
    let afterDOT = value.toString().split(".")[1];
    let beforeDOTDisplay;
    if (isNaN(beforeDOT)) {
      beforeDOTDisplay = "";
    } else {
      beforeDOTDisplay = beforeDOT.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (afterDOT == null) {
      return beforeDOTDisplay;
    } else {
      return `${beforeDOTDisplay}.${afterDOT}`;
    }
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.differentDisplay(
      this.currentOperand
    );
    if (this.operator != null) {
      this.previousOperandTextElement.innerText = `${this.differentDisplay(
        this.previousOperand
      )} ${this.operator}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-data]"
);
const currentOperandTextElement = document.querySelector("[data-current-data]");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperator(button.innerText);
    calculator.updateDisplay();
  });
});
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
