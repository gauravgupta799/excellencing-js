/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will be come from a textarea inserted into the DOM, and conversion will happen when the button is clicked.


THIS IS TEST DATA (Pasted to textarea)
underscore_case
 first_name
Some_Variable
    calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 Seperate console.log outputs)
underscoreCase
firstName
someVariable
calculateAge
delayedDeparture

*/

// First Append the Textarea and Button to the DOM with Javascript
// const textareaEl = document.createElement('textarea');
// console.log(textareaEl)
// document.body.append(textareaEl);


const getResultBtn = document.querySelector(".get-result-btn");

function getResult(values){
    for(const [key, value] of values.entries()){
        const [firstVlaue , secondValue] = value.toLowerCase().trim()?.split('_');
        const secondCorrect = secondValue[0].toUpperCase() + secondValue.slice(1); 
        const result = `${firstVlaue.concat(secondCorrect).padEnd(20)} ${'✅'.repeat(key + 1)}`;
        console.log(result);
    }
}

getResultBtn.addEventListener("click", ()=>{
    const textValue = document.querySelector("#textarea").value.trim().split('\n');
    getResult(textValue);
});