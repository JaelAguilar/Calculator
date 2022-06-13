let numbers = [...document.getElementsByClassName("number")]
let operationButtons=[...document.getElementsByClassName("operation")]
let display = document.getElementById("screen")
let previousValue="",currentValue="",globalSign

numbers.forEach(number => {
    number.addEventListener("click", () => insertValue(number.textContent))
});
operationButtons.forEach(operationButton => {
    operationButton.addEventListener("click",()=>operation(operationButton))
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
function operation(button) {
    if (previousValue !== "") {
        result=showResult()
        previousValue = result
        currentValue=""
    }
    else {
        previousValue = currentValue
        currentValue=""
    }
    globalSign = button.id
    console.log(button)
    styleSelectedButton(button)
}

/**
 * Makes the operation and shows it on the screen. If isFinal is true, it means that the '=' button is pressed so memory should be cleared
 * @param {bool} isFinal 
 * @returns result of operation
 */
function showResult(isFinal){
    let result
    //If the value exists, it converts it to float, else it's just 0
    previousValue = parseFloat(previousValue===""?0:previousValue)
    currentValue=parseFloat(currentValue===""?0:currentValue)
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
    display.innerText="0"
}

/**
 * Clears al values in memory
 */
function clearMemory() {
    currentValue=""
    previousValue = ""
    display.innerText="0"
}

/**
 * Add class "selected" only to the especified button so the user can remember which operation is currently being used.
 * @param {HTMLElement} selected 
 */
function styleSelectedButton(selected){
    operationButtons.forEach(button => {
        if (button.id == selected.id) {
            button.classList.add("selected")
        }
        else {
            button.classList.remove("selected")
        }
    })
}