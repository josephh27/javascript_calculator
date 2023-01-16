const myButtons = document.querySelector(".calculator-keys")
const fraction = document.querySelector("#fraction")
const calculator = {
    display: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
}

function inputDigit(value){
    const {display, waitingForSecondOperand} = calculator
    if (waitingForSecondOperand){
        calculator.display = value;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.display = display === "0" ? value : display + value;
    }
}

function greatest_common_factor(x, y){
    if (!y){
        return x
    } return greatest_common_factor(y, x % y)
}

function calculate(firstOperand, secondOperand, operator){
    let multiplier = 10**4
    if (operator === "+"){
        const sum = parseFloat((firstOperand + secondOperand).toFixed(4))
        if (!Number.isInteger(sum)){
            common_factor = Math.abs(greatest_common_factor(sum*multiplier, 1*multiplier))
            numerator = (sum*multiplier)/common_factor
            denominator = (1*multiplier)/common_factor
            fraction.innerHTML = `<sup>${numerator}</sup>&frasl;<sub>${denominator}</sub>`
            calculator.display = fraction.textContent 
        } else{
            calculator.display = `${firstOperand + secondOperand}`
        }
        return firstOperand + secondOperand
    } else if (operator === "-"){
        const difference = parseFloat((firstOperand - secondOperand).toFixed(4))
        if (!Number.isInteger(difference)){
            common_factor = Math.abs(greatest_common_factor(difference*multiplier, 1*multiplier))
            numerator = (difference*multiplier)/common_factor
            denominator = (1*multiplier)/common_factor
            fraction.innerHTML = `<sup>${numerator}</sup>&frasl;<sub>${denominator}</sub>`
            calculator.display = fraction.textContent 
        } else{
            calculator.display = `${firstOperand - secondOperand}`
        }
        
        return firstOperand - secondOperand
    } else if (operator === "*"){
        const product = parseFloat((firstOperand * secondOperand).toFixed(4))
        if (!Number.isInteger(product)){
            common_factor = Math.abs(greatest_common_factor(product*multiplier, 1*multiplier))
            numerator = (product*multiplier)/common_factor
            denominator = (1*multiplier)/common_factor
            fraction.innerHTML = `<sup>${numerator}</sup>&frasl;<sub>${denominator}</sub>`
            calculator.display = fraction.textContent 
        } else{
            calculator.display = `${firstOperand * secondOperand}`
        }
        return firstOperand * secondOperand
    } else if (operator === "/"){
        const quotient = parseFloat((firstOperand / secondOperand))
        if (!Number.isInteger(firstOperand)){
            multiplier = 10**(((firstOperand.toString()).split("."))[1].length)
        }
        if (!Number.isInteger(quotient)){
            numerator = (parseFloat(firstOperand)*multiplier)
            denominator = (secondOperand*multiplier)
            common_factor = Math.abs(greatest_common_factor(numerator, denominator))
            fraction.innerHTML = `<sup>${numerator/common_factor}</sup>&frasl;<sub>${denominator/common_factor}</sub>`
            calculator.display = fraction.textContent 
        } else{
            calculator.display = `${firstOperand / secondOperand}`
        }
        return firstOperand / secondOperand
    } else if (operator === "**2"){
        const squared = parseFloat((firstOperand ** 2).toFixed(4))
        if (!Number.isInteger(squared)){
            common_factor = Math.abs(greatest_common_factor(squared*multiplier, 1*multiplier))
            numerator = (squared*multiplier)/common_factor
            denominator = (1*multiplier)/common_factor
            fraction.innerHTML = `<sup>${numerator}</sup>&frasl;<sub>${denominator}</sub>`
            calculator.display = fraction.textContent 
        } else{
            calculator.display = `${firstOperand ** 2}`
        }
        return firstOperand ** 2
       
    } else if (operator === "**n"){
        const product = parseFloat((firstOperand ** secondOperand).toFixed(4))
        if (!Number.isInteger(product)){
            common_factor = Math.abs(greatest_common_factor(product*multiplier, 1*multiplier))
            numerator = (product*multiplier)/common_factor
            denominator = (1*multiplier)/common_factor
            fraction.innerHTML = `<sup>${numerator}</sup>&frasl;<sub>${denominator}</sub>`
            calculator.display = fraction.textContent 
        } else{
            calculator.display = `${firstOperand ** secondOperand}`
        }
        return firstOperand ** secondOperand
     } else if (operator === "**3"){
        const squared = parseFloat((firstOperand ** 3).toFixed(4))
        if (!Number.isInteger(squared)){
            common_factor = Math.abs(greatest_common_factor(squared*multiplier, 1*multiplier))
            numerator = (squared*multiplier)/common_factor
            denominator = (1*multiplier)/common_factor
            fraction.innerHTML = `<sup>${numerator}</sup>&frasl;<sub>${denominator}</sub>`
            calculator.display = fraction.textContent 
        } else{
            calculator.display = `${firstOperand ** 3}`
        }
        return firstOperand ** 3}
    return secondOperand
}


function handleOperator(secondOperator){
    const {firstOperand, display, operator} = calculator
    const inputValue = parseFloat(display)
    if (operator === "**2") {
        const result = calculate(firstOperand, inputValue, operator)
        calculator.firstOperand = result
    }
    if (operator === "**3") {
        const result = calculate(firstOperand, inputValue, operator)
        calculator.firstOperand = result
    }
    if (operator && calculator.waitingForSecondOperand){
        calculator.operator = secondOperator
        return
    }
    if (firstOperand === null && (!isNaN(inputValue))){
        calculator.firstOperand = inputValue
    } else if (operator){
        const result = calculate(firstOperand, inputValue, operator)
        calculator.firstOperand = result
    }
    calculator.waitingForSecondOperand = true
    calculator.operator = secondOperator
}

function inputDecimal(dot){
    if (calculator.waitingForSecondOperand === true){
        calculator.display = "0."
        calculator.waitingForSecondOperand = false
        return
    } if (!calculator.display.includes(dot)){
        calculator.display += "."
    }
}

function conversion(){
    const {display} = calculator
    
    if (display.includes(".")){
        const multiplier = 10**(display.split(".")[1].length)
        const numerator = (parseFloat(display)*multiplier)
        const denominator = (1*multiplier)
        const common_factor = Math.abs(greatest_common_factor(numerator, denominator))
        fraction.innerHTML = `<sup>${numerator/common_factor}</sup>&frasl;<sub>${denominator/common_factor}</sub>`
        calculator.display = fraction.textContent 
    }
    else if (display.includes("⁄")){
        const numerator = parseFloat(display.split("⁄")[0])
        const denominator = parseFloat(display.split("⁄")[1])
        calculator.display = (numerator/denominator).toString()
    }
}

function resetCalculator(){
    calculator.display = "0"
    calculator.firstOperand = null
    calculator.operator = null
    calculator.waitingForSecondOperand = false
}

function updateDisplay(){
    const display = document.querySelector("#calculator-screen")
    display.value = calculator.display
}

updateDisplay()
myButtons.addEventListener("click", (event) => {
    const {target} = event
    const {value} = target
    if(!target.matches('button')){
        return;
    }
    switch (value){
        case '+':
        case '-':
        case '*':
        case '/': 
        case '=': 
        case '**2':
        case '**3':
        case '**n':
         handleOperator(value)
         break
        case '.':
            inputDecimal(value)
            break
        case 'clr':
            resetCalculator()
            break
        case 'convert':
            conversion()
            break
        default:
        if (Number.isInteger(parseFloat(value))){
            inputDigit(value)
        }
    } 
    updateDisplay()

})













// const calculator = {
//     displayValue: '0',
//     firstOperand: null,
//     waitingForSecondOperand: false,
//     operator: null,
//   };
  
//   function inputDigit(digit) {
//     const { displayValue, waitingForSecondOperand } = calculator;
  
//     if (waitingForSecondOperand === true) {
//       calculator.displayValue = digit;
//       calculator.waitingForSecondOperand = false;
//     } else {
//       calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
//     }
//   }
  
//   function inputDecimal(dot) {
//     if (calculator.waitingForSecondOperand === true) {
//         calculator.displayValue = "0."
//       calculator.waitingForSecondOperand = false;
//       return
//     }
  
//     if (!calculator.displayValue.includes(dot)) {
//       calculator.displayValue += dot;
//     }
//   }
  
//   function handleOperator(nextOperator) {
//     const { firstOperand, displayValue, operator } = calculator
//     const inputValue = parseFloat(displayValue);
    
//     if (operator && calculator.waitingForSecondOperand)  {
//       calculator.operator = nextOperator;
//       return;
//     }
  
  
//     if (firstOperand == null && !isNaN(inputValue)) {
//       calculator.firstOperand = inputValue;
//     } else if (operator) {
//       const result = calculate(firstOperand, inputValue, operator);
  
//       calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
//       calculator.firstOperand = result;
//       console.log(result)
//     }
  
//     calculator.waitingForSecondOperand = true;
//     calculator.operator = nextOperator;
//   }
  
//   function calculate(firstOperand, secondOperand, operator) {
//     if (operator === '+') {
//       return firstOperand + secondOperand;
//     } else if (operator === '-') {
//       return firstOperand - secondOperand;
//     } else if (operator === '*') {
//       return firstOperand * secondOperand;
//     } else if (operator === '/') {
//       return firstOperand / secondOperand;
//     } return secondOperand
//   }
  
//   function resetCalculator() {
//     calculator.displayValue = '0';
//     calculator.firstOperand = null;
//     calculator.waitingForSecondOperand = false;
//     calculator.operator = null;
//   }

  
//   function updateDisplay() {
//     const display = document.querySelector('.calculator-screen');
//     display.value = calculator.displayValue;
//   }
  
//   updateDisplay();
  
//   const keys = document.querySelector('.calculator-keys');
//   keys.addEventListener('click', event => {
//     const { target } = event;
//     const { value } = target;
//     if (!target.matches('button')) {
//       return;
//     }
  
//     switch (value) {
//       case '+':
//       case '-':
//       case '*':
//       case '/':
//       case '=':
//         handleOperator(value);
//         break;
//       case '.':
//         inputDecimal(value);
//         break;
//       case 'all-clear':
//         resetCalculator();
//         break;
//       default:
//         if (Number.isInteger(parseFloat(value)))
//           inputDigit(value);
//         }
  
//     updateDisplay();
//   });
  
  
