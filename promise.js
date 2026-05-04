/* 
Promise: It's an object that encapsulates the result of an asynchronous operations.
A promoise object has a state that can be one of the following:
    . Pending
    . Fullfilled with a value
    . Rejected for a reasion

In the begining, the state of a promise is pending, indicating that the asynchronous operation is in progress. Depending on the result of the asynchronous operation, the state changes to either fulfilled or rejected.

The fullfilled state indicates that the asynchronous operation was completed successfully.
The rejected state indicates that the asynchronous operation is failed.
*/

// const promise = new Promise((resolve, reject)=>{
//     // Contain an operation

//     // return the state
//     if(success){
//         resolve(value);
//     } else{
//         reject(error);
//     }
// });

/* 
The promise constructor accepts a callback function that typically performs an asynchronous operation.
This function is often referred to as an executor.

In turn, the executor accepts two callback functions with the name resolve & reject.

If the asynchronous operation completes successfully, the executor will call the resolve() function to change the state of the promise from pending to fullfilled with a value.

In case of an error, the executor will call the reject() function to change the state of the promise from pending to rejected with the error reason.

Once a promise reaches either a fulfilled or rejected state, it stays in that state and can't go to another state.


CONSUMING A PROMISE: then, catch, finally

? 1. The then() method
    To get the value of a promise when it's fulfilled, you call the then() method of the promise object. THe following shows the syntax of the then() method.
*/

// promise.then(onFulfilled, onRejected);


// let success = true;
// function getUser(){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             if(success){
//                 resolve([
//                     { username:"John", email:"john@gmail.com"},
//                     { username: "Gaurav", email:"gaurav@gmail.com"}
//                 ])
//             }else{
//                 reject("Failed to the user list.")
//             }
//         }, 1000);
//     })
// }

// function onFulfilled(users){
//     console.log("On promise fulfilled: ", users)
// }

// function onRejected(error){
//     console.log("On promise rejected:", error);
// }

// const returnedPromise = getUser();
// returnedPromise.then((users)=>{
//     console.log(users);
// });
// or

// getUser().then((users)=> console.log("By chaning: ", users));

// const promise = getUser();
// promise.then(onFulfilled, onRejected);


//? 2. The catch() method
/* 
If you want to get the error only when the state of the promise is rejected, you can use the catch() method of the Promise object.
*/
// promise.catch(onRejected);
// // Internally,the catch() method invoked the then(undefined, onRejected) method.

// promise.catch((error)=>{
//     console.log(error);
// });

//? 3. The finally() method
// Sometimes you wnat to execute the same piece of code whether the promise is fulfilled or rejected.

// const render= ()=>{
//     //....
// }

// getUser().then((users)=>{
//     console.log(users);
//     render();
// }).catch((error)=>{
//     console.log(error);
//     render();
// });

// To remove the duplicate and execute the render() whether the promise is fulfilled or rejected, you can use the finally method.

// getUser().then((users)=>{
//     console.log(users);
// }).catch((error)=>{
//     console.log(error);
// }).finally(()=>{
//     render();
// });


//! A PRACTICAL JAVASCRIPT PROMISE EXAMPLE
/* 
The following example shows how to load a JSON file from the server and display its contents on a webpage.
*/


// function load(url){
//     return new Promise(function(resolve, reject){
//         const request = new XMLHttpRequest();
//         request.onreadystatechange = function(){
//             if(this.readyState === 4 && this.status == 200){
//                 resolve(this.response);
//             }else{
//                 reject(this.status);
//             }
//         };
//         request.open("GET", url, true);
//         request.send();
//     });
// }

// const url = 'https://www.javascripttutorial.net/sample/promise/api.json';
// const btn = document.querySelector("#btnGet");
// const msg = document.querySelector("#message");

// btn.addEventListener("click", ()=>{
//     load(url).then((res)=>{
//         const result = JSON.parse(res);
//         msg.innerHTML = result.message;
//     }).catch((error)=>{
//         msg.innerHTML = `Error getting the message, HTTP status: ${error}`
//     })
// });



//? #Promise Chaining
/* 
Sometimes , you want to execute two or more related asynchronous operations, where the next operation starts with the result from the previous one.
*/

// let p = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         resolve(10);
//     }, 3 * 100)
// });

// p.then((result)=>{
//     console.log(result);
//     return result * 2;
// });

// then() method exceutes once the promise is resolved. In callback show the result of the promise and return a new value multiplied by two
// Because then() method returns a new promise with a value resolved to a value, you can call the then() method on the resolve Promise

// p.then((result)=>{
//     console.log(result);
//     return result * 2;
// }).then((result)=>{
//     console.log(result);
//     return result * 3;
// }).then((result)=>{
//     console.log(result);
//     return result * 4;
// })

// Output: 10 20


// ** RETURNING A Promise
// p.then((result)=>{
//     console.log(result);
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             resolve(result * 2);
//         }, 3*1000)
//     })
// }).then((result)=>{
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             resolve(result * 3)
//         }, 3 * 1000)
//     })
// }).then(result=> console.log(result));

// ** Modified Code

// function generateNumber(num){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             resolve(num);
//         }, 3 * 1000)
//     });
// }

// generateNumber(10).then((result)=>{
//     console.log(result);
//     return generateNumber(result * 2);
// }).then((result)=>{
//     return generateNumber(result * 3);
// }).then((result)=>{
//     console.log(result);
// });

/* Suppose you want to perform the following asynchronous operations in sequence:
    . First get the use from the database
    . Second, get the services of the selected user
    . Third, calculate the service cose from the user's services.
*/

function getUser(userId){
    return new Promise((resolve, reject)=>{
        console.log("Get the user from the database.");
        setTimeout(()=>{
            resolve({
                userId: userId, username: "admin"
            });
        }, 1000)
    })
}

// function getService(user){
//     return new Promise((resolve, reject)=>{
//         console.log(`Get the services of ${user.username} from the user API.`);
//         setTimeout(()=>{
//             resolve(['Email', 'VPN', 'CDN'])
//         }, 3*1000)
//     });
// }

// function getServiceCost(services){
//     return new Promise((resolve, reject)=>{
//         console.log("Calculate the service cost of" + services);
//         setTimeout(()=>{
//             resolve(services.length * 100)
//         }, 2 * 1000);
//     })
// }

// getUser(10).then(getService).then(getServiceCost).then(console.log(("")))


// ! ==== Promise Examples =====
// const lotteryPromise = new Promise((resolve, reject)=>{
//     console.log("Lottery draw is happening...");
//     setTimeout(()=>{
//         if(Math.random() >= 0.5){
//             resolve("You win 🤑")
//         }else{
//             reject(new Error("You lost your money 💩"))
//         }
//     },2000);
// })

// lotteryPromise.then((res)=>{
//     console.log(res);
// }).catch((error)=>{
//     console.error(error);
// });


// ? ==== Callback Hell =====
// setTimeout(()=>{
//     console.log("1 second passed");
//     setTimeout(()=>{
//         console.log("2 second passed");
//         setTimeout(()=>{
//             console.log("3 second passed");
//             setTimeout(()=>{
//                 console.log("4 second passed")
//             },1000)
//         },1000)
//     },1000)
// },1000)


//? ===== Promisifying setTimeout =====
// const wait = function(seconds){
//     return new Promise(resolve => {
//         setTimeout(resolve, seconds * 1000);
//     });
// }

// wait(1).then(()=>{
//     console.log("1 second passed");
//     return wait(2);
// }).then(()=>{
//     console.log("2 second passed");
//     return wait(3);
// }).then(()=>{
//     console.log("3 second passed");
//     return wait(4);
// }).then(()=>{
//     console.log("4 second passed")
// })


//? ===== Promisifying the Geolocation API ====
// navigator.geolocation.getCurrentPosition(
//     position=> console.log(position), 
//     err => console.log(err)
// );


// const getPosition = function(){
//     // return new Promise((resolve, reject)=>{
//     //     navigator.geolocation.getCurrentPosition(
//     //         position => resolve(position),
//     //         err => reject(err)
//     //     )
//     // })

//     // OR
//    navigator.geolocation.getCurrentPosition(resolve, reject)
// }

// getPosition().then((position)=> console.log(position)).catch((err)=> console.log(err))


// ?====== Consuming Promises with Async/Await =====
// const whereAmI = async ()=> {
//     // Geolocation
//     const pos = await getPosition();
//     const {latitude:lat, longitude: lng} = pos.coords;

//     // Reverse geoconding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lang}?geoit=json}`);
//     const dataGeo = await resGeo.json();

//     // Country Data
//     const response = await fetch(`https://restcountries.com/rest/v2/name/${dataGeo.coutryCode}`);
//     const data = await response.json();
//     console.log(data);
// }

// whereAmI("india");
// console.log("FIRST");


// ? ===== Error Handling with try/catch =====
// const whereAmI = async ()=> {
//     try {
//         // Geolocation
//         const pos = await getPosition();
//         const {latitude:lat, longitude: lng} = pos.coords;

//         // Reverse geoconding
//         const resGeo = await fetch(`https://geocode.xyz/${lat},${lang}?geoit=json}`);
//         if(!resGeo.ok) throw new Error("Problem getting location data");
//         const dataGeo = await resGeo.json();

//         // Country Data
//         const response = await fetch(`https://restcountries.com/rest/v2/name/${dataGeo.coutryCode}`);
//         if(!response.ok) throw new Error("Problem getting country");
//         const data = await response.json();
//         // console.log(data);
        
//     } catch (error) {
//         console.error(error.message);
//         throw new Error("Something went wrong" + error.message)
//     }
// }


// ?===== How to return something in async/await ===
// const whereAmI = async ()=> {
//     try {
//         // Geolocation
//         const pos = await getPosition();
//         const {latitude:lat, longitude: lng} = pos.coords;

//         // Reverse geoconding
//         const resGeo = await fetch(`https://geocode.xyz/${lat},${lang}?geoit=json}`);
//         if(!resGeo.ok) throw new Error("Problem getting location data");
//         const dataGeo = await resGeo.json();

//         // Country Data
//         const response = await fetch(`https://restcountries.com/rest/v2/name/${dataGeo.coutryCode}`);
//         if(!response.ok) throw new Error("Problem getting country");
//         const data = await response.json();
//         // console.log(data);

//         return `You are in ${dataGeo.city}, ${dataGeo.country}`
        
//     } catch (error) {
//         console.error(error.message);
//         throw new Error("Something went wrong" + error.message)
//     }
// }

// console.log(`1: Will get location`);

/* 
 This is not nice approach to handle the promise when async/await return something
*/

// whereAmI()
// .then(city => console.log(`2: ${city}`))
// .catch(err=> console.log(`2: ${err.message}`))
// .finally(()=> console.log("3: Finished getting location"))


/*
This is a nice approach to write the code withput mixing 
the async/await with .then() and .catch() methods when it returns something
*/

// (async function(){
//     try {
//         const city = await whereAmI();
//         console.log(`2: ${city}`)
//     } catch (err) {
//         console.log(`2: ${err.message}`)
//     }
//     console.log("3: Finished getting location")
// })();


// === getJSON Function ====
function getJSON(url, errorMsg='Something went wrong'){
    return fetch(url).then((res)=>{
        if(!res.ok) throw new Error(`${errorMsg} (${res.status})`);
        return res.json();
    });
}


// ?=== Running Promises in Parallel ====
// const get3Countries = async (c1, c2, c3)=>{
//     try {
//         const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1.trim()}`);
//         const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2.trim()}`);
//         const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3.trim()}`);
//         console.log(`Capital of these 3 countries: ${[data1.capital, data2.capital, data3.capital]}`)
//     } catch (error) {
//         console.error(error)
//     }
// }

// ** Run API in parallel using the Promise.all() 
const get3Countries = async (c1, c2, c3)=>{
    try {
        const data = await Promise.all([
            getJSON(`https://restcountries.com/v3.1/name/${c1.trim()}`),
            getJSON(`https://restcountries.com/v3.1/name/${c2.trim()}`),
            getJSON(`https://restcountries.com/v3.1/name/${c3.trim()}`),]
        )
        data.map((d)=> console.log(d[0].capital));
    } catch (error) {
        console.error(error);
    }
}

get3Countries('india', 'canada', 'portugal');