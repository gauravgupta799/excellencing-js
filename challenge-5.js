// Coding Challenge 5

/*
Let's build a simple poll app

A poll has a question, an array of options from which people can choose, and an array with the number 
of replies for each option. This data is stored in the starter ibject below.


Here are your tasks"

1. Create a method called 'registerNewAnswer' on the 'poll' object. This method deos 2 things:
   1.1. Display a propmt window for the user to input the number of the selected option. 
   The propmt should look this:
        What is your favourite programming language?
        0: Javascript
        1: Python
        2: Rust
        3: C++

    1.2. Based on the input number, udate the answers array. For example, if the options is 3, increase the
        value At Postion 3 of the array by 1. Make sure to check if the input is a number and if the number makes
        sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the use clicks the "Answer poll" button
3. Create a mehod 'displayResults' which displays the poll results. The method takes a string as an input
    (Called 'type'), which can be either 'string' or 'array'. 
    If type is 'array', simply display the results array as it is, using console.log(). 
    This should be the defult option. If type is 'string' display a string like "Poll results are 13,2,4,1".
4.  Run the "displayResults" method at the end of each 'registerNewAnswer' method call.

*/

const poll = {
    question:"What is your favourite programming language?",
    options:['0: Javascript', '1: Python', '2: Rust', '3: C++'],
    answers:new Array(4).fill(0),
    registerNewAnswer(){
        const question = `${this.question}\n${this.options.join('\n')}`
        const answer = Number(prompt(question));
        if(answer < this.answers.length){
            this.answers[answer]++;
            return answer;
        }else{
            console.log("Invalid Option")
        }
    },
    displayResults(tpye = "array"){
        if(type === 'array'){
            console.log(this.answers)
        }else if(type === "string"){
            console.log(`Poll results are ${this.answers.join(",")}`)
        }

    }
}

// document.querySelector(".poll-btn").addEventListener("click", ()=> poll.registerNewAnswer())
document.querySelector(".poll-btn").addEventListener("click", poll.registerNewAnswer.bind(poll))

