let numbers = [...document.getElementsByClassName("number")]
console.log(numbers.textContent)
let previousValue,currentValue=""

numbers.forEach(number => {

    number.addEventListener("click",()=>console.log(number.textContent))
});

