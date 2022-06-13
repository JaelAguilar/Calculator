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
    else if(currentValue!==""){
        previousValue = currentValue
        currentValue=""
    }
    globalSign = button.id
    styleSelectedButton(button)
    console.log("previous: ", previousValue)
    console.log("sign: ",globalSign)
    console.log("current: ", currentValue)
}

/**
 * Makes the operation and shows it on the screen. If isFinal is true, it means that the '=' button is pressed so memory should be cleared
 * @param {bool} isFinal 
 * @returns result of operation
 */
function showResult(isFinal){
    let result
    //If the value exists, it converts it to float, else it's just 0
    previousValue = parseFloat(previousValue === "" ? 0 : previousValue)
    console.log("previous: ", previousValue)
    console.log("sign: ",globalSign)
    console.log("current: ", currentValue)
    if (currentValue !== "") {
        currentValue = parseFloat(currentValue)
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
                result=currentValue
            break;
        }
    }
    //If currentValue is empty, we are already sure that previousValue is 0 or a value so we show that
    else {
        result = previousValue
    }
    if (isFinal) {
        previousValue = result
        currentValue=""
        styleSelectedButton()
    }
    if (result == null) {
        console.error("Something went wrong while calculating. Please add an issue in https://github.com/JaelAguilar/Calculator/issues")
    }
    //Solution to round nicely with as few errors as possible. https://stackoverflow.com/a/41716722
    display.innerText = Math.round( result * 100000 + Number.EPSILON ) / 100000
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
    globalSign=undefined
    display.innerText = "0"
    styleSelectedButton()
}

/**
 * Add class "selected" only to the especified button so the user can remember which operation is currently being used.
 * @param {HTMLElement} selected 
 */
function styleSelectedButton(selected) {
    operationButtons.forEach(button => {
        //Lazy evaluation, checks first if selected is true to avoid bugs if selected doesn't exist
        if (selected && button.id == selected.id) {
            button.classList.add("selected")
        }
        else {
            button.classList.remove("selected")
        }
    })
}