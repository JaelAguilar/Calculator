let numbers = [...document.getElementsByClassName("number")]
let operationButtons=[...document.getElementsByClassName("operation")]
let display = document.getElementById("screen")
let previousValue="",currentValue="",globalSign

numbers.forEach(number => {
    number.addEventListener("click", () => insertValue(number.textContent))
});
operationButtons.forEach(operationButton => {
    operationButton.addEventListener("click",()=>operation(operationButton.id))
})

/**
 * Function to insert values, changes the currentValue and shows it on the screen.
 * @param {String} digit 
 */
function insertValue(digit) {
    currentValue += digit
    display.innerText=currentValue
}

/**
 * Changes the type of operation used depneding on the button pressed. If two values were already inserted, it shows the result, else it updates the previous and current value
 * @param {String} newSign 
 */
function operation(newSign) {
    if (previousValue !== "") {
        result=showResult()
        previousValue = result
        currentValue=""
    }
    else {
        previousValue = currentValue
        currentValue=""
    }
    globalSign=newSign
}

/**
 * Makes the operation and shows it on the screen. If isFinal is true, it means that the '=' button is pressed so memory should be cleared
 * @param {bool} isFinal 
 * @returns result of operation
 */
function showResult(isFinal){
    let result
    previousValue = parseFloat(previousValue)
    currentValue=parseFloat(currentValue)
    switch (globalSign) {
        case "sum":
            result=previousValue+currentValue
            break;
        case "sub":
            result=previousValue-currentValue
            break;
        case "mul":
            result=previousValue*currentValue
            break;
        case "div":
            result=previousValue/currentValue
            break;
        default:
            break;
    }
    if (isFinal) {
        clearMemory()
    }
    display.innerText = result
    return result
}

/**
 * Changes sign of currentValue
 */
function changeSign() {
    currentValue *= -1
    display.innerText=currentValue
}

/**
 * Divides currentValue by 100 to make a percentage
 */
function percentage() {
    currentValue /= 100
    display.innerText=currentValue
}

/**
 * Erases the current value
 */
function clearCurrent() {
    currentValue = ""
    display.innerText="\u00A0"
}

/**
 * Clears al values in memory
 */
function clearMemory() {
    currentValue=""
    previousValue = ""
    display.innerText="\u00A0"
}