const buttonsCalculator = document.querySelectorAll(".js-button-calculator");
const renderCalculation = document.querySelector(".js-render-calculation");
const btnClear = document.getElementById("all-clear");

buttonsCalculator.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    if (renderCalculation?.innerHTML === "Error") {
      renderCalculation.innerHTML = "";
    }
    updateCalculation(value);
  });
});

let storedOperator = null;
let currentNumber = "";
let previousNumber = "";

function updateCalculation(value) {
  if (!renderCalculation) return;

  const operatorButtons = document.querySelectorAll(".operator-button");
  operatorButtons.forEach((button) =>
    button.classList.remove("operator-active")
  );

  switch (value) {
    case "7":
    case "8":
    case "9":
    case "4":
    case "5":
    case "6":
    case "1":
    case "2":
    case "3":
    case "0":
    case ".":
      currentNumber += value;
      renderCalculation.innerHTML = currentNumber;
      btnClear.innerHTML = "C";
      break;

    case "/":
    case "*":
    case "-":
    case "+":
      if (currentNumber) {
        if (previousNumber === "") {
          previousNumber = currentNumber;
        } else {
          previousNumber = calculate(
            previousNumber,
            storedOperator,
            currentNumber
          );
        }
        currentNumber = "";
      }
      storedOperator = value;

      const activeButton = document.querySelector(`[data-value="${value}"]`);
      if (activeButton) {
        activeButton.classList.add("operator-active");
      }
      break;

    case "ac":
      currentNumber = "";
      previousNumber = "";
      storedOperator = null;
      renderCalculation.innerHTML = "0";
      btnClear.innerHTML = "AC";
      break;

    case "=":
      if (currentNumber && storedOperator) {
        const result = calculate(previousNumber, storedOperator, currentNumber);
        renderCalculation.innerHTML = result;
        previousNumber = result;
        currentNumber = "";
        storedOperator = null;
      }
      break;
  }
}

function calculate(num1, operator, num2) {
  const a = parseFloat(num1);
  const b = parseFloat(num2);
  switch (operator) {
    case "+":
      return (a + b).toString();
    case "-":
      return (a - b).toString();
    case "*":
      return (a * b).toString();
    case "/":
      if (b === 0) {
        return "Error";
      }
      return (a / b).toString();
    default:
      return "0";
  }
}

function initializeButtons() {
  document.getElementById("seven")?.setAttribute("data-value", "7");
  document.getElementById("height")?.setAttribute("data-value", "8");
  document.getElementById("nine")?.setAttribute("data-value", "9");
  document.getElementById("four")?.setAttribute("data-value", "4");
  document.getElementById("five")?.setAttribute("data-value", "5");
  document.getElementById("six")?.setAttribute("data-value", "6");
  document.getElementById("one")?.setAttribute("data-value", "1");
  document.getElementById("two")?.setAttribute("data-value", "2");
  document.getElementById("three")?.setAttribute("data-value", "3");
  document.getElementById("zero")?.setAttribute("data-value", "0");
  document.getElementById("float")?.setAttribute("data-value", ".");
  document.getElementById("all-clear")?.setAttribute("data-value", "ac");
  document.getElementById("division")?.setAttribute("data-value", "/");
  document.getElementById("multiplication")?.setAttribute("data-value", "*");
  document.getElementById("substraction")?.setAttribute("data-value", "-");
  document.getElementById("addition")?.setAttribute("data-value", "+");
  document.getElementById("equal")?.setAttribute("data-value", "=");
}

initializeButtons();
