let numbers = [...document.getElementsByClassName("number")]
let display = document.getElementById("screen")
let previousValue="",currentValue="",globalSign

numbers.forEach(number => {
    number.addEventListener("click", () => insertValue(number.textContent))
});

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
 * Makes the operation and shows it on the screen
 * @returns result of operation
 */
function showResult(){
    let result
    previousValue = parseInt(previousValue)
    currentValue=parseInt(currentValue)
    switch (globalSign) {
        case "+":
            result=previousValue+currentValue
            break;
        case "-":
            result=previousValue-currentValue
            break;
        case "*":
            result=previousValue*currentValue
            break;
        case "/":
            result=previousValue/currentValue
            break;
        default:
            break;
    }
    display.innerText=result
    return result
}