// Mark and John are trying to compare their BMI (Body Mass Index), 
// which is calculated using the formula: BMI = mass / (height * height) (mass in kg and height in meters).

// Your task is to write some code to help them:
// Store Mark's and John's mass and height in variables called massMark, heightMark, massJohn and heightJohn.
// Calculate both their BMIs using the formula, and store the results in two variables called BMIMark and BMIJohn.
// Log the value of BMIMark and BMIJohn to the console.

// BONUS: Create a boolean variable markHigherBMI containing information about whether Mark has a higher BMI than John. Log it to the console too

// TEST DATA 1: Marks weighs 78 kg and is 1.69 m tall. John weighs 92 kg and is 1.95 m tall.
// TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

/* Write your code below. Good luck! 🙂 */

const person1Name = "Mark";
const person2Name = "John";

// TEST DATA 1
const mass1Mark = 78;
const height1Mark = 1.69;
const mass1John = 92;
const height1John = 1.95;

// TEST DATA 2
const mass2Mark = 95;
const height2Mark = 1.88;
const mass2John = 92;
const height2John = 1.95;


// Body Mass should be in kg and Height in meter
// Function to calculate BMI of a person 
function CalculateBMI(bodyMass, bodyHeight){
    const BMI = (bodyMass / ( bodyHeight * bodyHeight)).toFixed(3);
    return BMI;
}

// Function to check higher BMI
function checkHigherBMI(person1BMI, person2BMI){
    const result = person1BMI > person2BMI ? person1Name : person2Name;
    return result;
}

const BMI_1_Mark = CalculateBMI(mass1Mark, height1Mark);
const BMI_1_John = CalculateBMI(mass1John, height1John);
const markHigherBMI_DATA1 = checkHigherBMI(BMI_1_Mark, BMI_1_John);

// TEST FOR DATA 1
console.log("=== BMI results for DATA 1 =====");
console.log("BMI of Mark: ", BMI_1_Mark);
console.log("BMI of John: ", BMI_1_John);
console.log(`${markHigherBMI_DATA1}'s BMI is higher.`);


// TEST FOR DATA 2
const BMI_2_Mark = CalculateBMI(mass2Mark, height2Mark);
const BMI_2_John = CalculateBMI(mass2John, height2John);
const markHigherBMI_DATA2 = checkHigherBMI(BMI_2_Mark, BMI_2_John);

console.log("=== BMI results for DATA 2 =====");
console.log("BMI of Mark: ", BMI_2_Mark);
console.log("BMI of John: ", BMI_2_John);
console.log(`${markHigherBMI_DATA2}'s BMI is higher.`);



// BMIMark > BMIJohn ? console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`) : console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`);