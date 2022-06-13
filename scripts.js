let numbers = [...document.getElementsByClassName("number")]
let display = document.getElementById("screen")
let previousValue="",currentValue="",sign

numbers.forEach(number => {
    number.addEventListener("click", () => insertValue(number.textContent))
});

function insertValue(digit) {
    console.log("PreviousValue: "+previousValue)
    currentValue += digit
    console.log("Current Value: "+currentValue)
}

function operation(sign2) {
    if (previousValue !== "") {
        result=showResult()
        previousValue = result
        currentValue=""
    }
    else {
        previousValue = currentValue
        currentValue=""
    }
    sign=sign2
}

function showResult(){
    let result
    previousValue = parseInt(previousValue)
    currentValue=parseInt(currentValue)
    switch (sign) {
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