"use strict";

/* ==== Default Parameters ==== */
const bookings =[]
const createBooking = function(flightName, numPassengers=1, price= 99 * numPassengers){
  const booking ={
    flightName, numPassengers, price
  }
  console.log(booking);
  bookings.push(booking);
}

// createBooking("LH123");
// createBooking("LH123", 2, 800);


/* ==== How Passing Arguments works: Value vs Reference ====*/
let flight = "LH234";
const person = {
    name:"Gaurav Gupta",
    passport:234549495875
}
const checkIn = function(flightNum, passenger){
    flightNum = "LH998";
    passenger.name = "Mr. " + passenger.name;
    passenger.passport === 234549495875 ? console.log("Checked In!") : console.log("Wrong Passport!");
}

// checkIn(flight, person);
// console.log(flight); // LH234
// console.log(person); // {name:"Mr. Gaurav Gupta", passport:234549495875} 


const newPassport = function(personObj){
    personObj.passport = Math.trunc(Math.random() * 10000000000);
}

console.log(newPassport(person));
checkIn(flight, person);
console.log(person);


// Call and Apply Methods

const lufthansa={
  airline:"Lufthansa",
  iataCode:"LH",
  bookings:[],
  book(flightNum, name){
    // console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`)
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name,});
  }
}

lufthansa.book(348, "Gaurav Gupta");
console.log("Lufthansa",lufthansa);

const eurowings = {
  airline:"Eurowings",
  iataCode:"EW",
  bookings:[],
}

const book = lufthansa.book;
// book(350, "William"); // Undefined
/* Undefined, because it's not a method, it behaves like a regular function. this keyword point to the global object where this value is undefined */


// To resolve this issue, we can use call, apply or bind method

// call() method: takes first values object and second list of primitive values
book.call(eurowings, 26, "Sarah William");
console.log("Eurowings", eurowings);

book.call(lufthansa, 36, "Smith");
console.log("Lufthansa with call method: ",lufthansa)

const swiss = {
  airline:"Swiss Airline",
  iataCode:"LX",
  bookings:[],
}

book.call(swiss, 545, "Mary Cooper");
console.log("Swiss Airline: ", swiss);

// apply() method
const flightData = [689, "George Cooper"]
book.apply(swiss, flightData);
console.log("Swiss using apply method: ", swiss);

// bind method
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, "Steven Williams");
console.log("Eurowings", eurowings)

const bookEW23 = book.bind(eurowings, 23);
bookEW23("Jonas Singh");
bookEW23("Martha Gupta");


// const addTax = (rate, value)=> value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(100))
// console.log(addVAT(24)); 

const addTax = (rate)=>{
  return (value)=> value + value * rate;
}

const addVAT = addTax(0.23);
const result = addVAT(100);
console.log(result);