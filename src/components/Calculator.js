import React, { useState } from 'react';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [operator, setOperator] = useState(null);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  }

  const inputDecimal = (dot) => {
    if (waitingForSecondOperand) {
      setDisplayValue("0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!displayValue.includes(dot)) {
      setDisplayValue(displayValue + dot);
    }
  }

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(parseFloat(result.toFixed(7))));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  }

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        console.log("incorrect operator !!");
        return secondOperand;
    }
  }

  const updateDisplay = () => {
    const display = document.querySelector(".calculator-screen");
    display.value = displayValue;
  }

  const resetCalculator = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
    setOperator(null);
    updateDisplay();
  }

  const handleButtonClick = (value) => {
    switch (value) {
      case "+":
      case "-":
      case "*":
      case "/":
      case "=":
        handleOperator(value);
        break;
      case ".":
        inputDecimal(value);
        break;
      case "all-clear":
        resetCalculator();
        break;
      default:
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value);
        }
    }

    updateDisplay();
  }

  return (
    <div className = "calculator">
      <input type="text" className="calculator-screen" value={displayValue} readOnly />
      <div className="calculator-keys" onClick={(e) => handleButtonClick(e.target.value)}>
            <button value="+" className="operator">+</button>
            <button value="-" className="operator">-</button>
            <button value="*" className="operator">&times;</button>
            <button value="/" className="operator">&divide;</button>

            <button value="7">7</button>
            <button value="8">8</button>
            <button value="9">9</button>
            
            
            <button value="4">4</button>
            <button value="5">5</button>
            <button value="6">6</button>
            
            <button value="1">1</button>
            <button value="2">2</button>
            <button value="3">3</button>
            
            <button value="0">0</button>
            <button value="." className="decimal">.</button>
            <button value="all-clear" className="all-clear">AC</button>
            <button value="=" className="operator" id="equal-sign">=</button>
      </div>
    </div>
  );
}

export default Calculator;
