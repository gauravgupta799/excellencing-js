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


let success = true;
function getUser(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(success){
                resolve([
                    { username:"John", email:"john@gmail.com"},
                    { username: "Gaurav", email:"gaurav@gmail.com"}
                ])
            }else{
                reject("Failed to the user list.")
            }
        }, 1000);
    })
}

function onFulfilled(users){
    console.log("On promise fulfilled: ", users)
}

function onRejected(error){
    console.log("On promise rejected:", error);
}

// const returnedPromise = getUser();
// returnedPromise.then((users)=>{
//     console.log(users);
// });
// or

// getUser().then((users)=> console.log("By chaning: ", users));

const promise = getUser();
promise.then(onFulfilled, onRejected);


//? 2. The catch() method
/* 
If you want to get the error only when the state of the promise is rejected, you can use the catch() method of the Promise object.
*/
promise.catch(onRejected);
// Internally,the catch() method invoked the then(undefined, onRejected) method.

promise.catch((error)=>{
    console.log(error);
});

//? 3. The finally() method
// Sometimes you wnat to execute the same piece of code whether the promise is fulfilled or rejected.

const render= ()=>{
    //....
}

getUser().then((users)=>{
    console.log(users);
    render();
}).catch((error)=>{
    console.log(error);
    render();
});

// To remove the duplicate and execute the render() whether the promise is fulfilled or rejected, you can use the finally method.

getUser().then((users)=>{
    console.log(users);
}).catch((error)=>{
    console.log(error);
}).finally(()=>{
    render();
});


//! A PRACTICAL JAVASCRIPT PROMISE EXAMPLE
/* 
The following example shows how to load a JSON file from the server and display its contents on a webpage.
*/


function load(url){
    return new Promise(function(resolve, reject){
        const request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(this.readyState === 4 && this.status == 200){
                resolve(this.response);
            }else{
                reject(this.status);
            }
        };
        request.open("GET", url, true);
        request.send();
    });
}

const url = 'https://www.javascripttutorial.net/sample/promise/api.json';
const btn = document.querySelector("#btnGet");
const msg = document.querySelector("#message");

btn.addEventListener("click", ()=>{
    load(url).then((res)=>{
        const result = JSON.parse(res);
        msg.innerHTML = result.message;
    }).catch((error)=>{
        msg.innerHTML = `Error getting the message, HTTP status: ${error}`
    })
});



//? #Promise Chaining
/* 
Sometimes , you want to execute two or more related asynchronous operations, where the next operation starts with the result from the previous one.
*/

let p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve(10);
    }, 3 * 100)
});

p.then((result)=>{
    console.log(result);
    return result * 2;
});

// then() method exceutes once the promise is resolved. In callback show the result of the promise and return a new value multiplied by two
// Because then() method returns a new promise with a value resolved to a value, you can call the then() method on the resolve Promise

p.then((result)=>{
    console.log(result);
    return result * 2;
}).then((result)=>{
    console.log(result);
    return result * 3;
}).then((result)=>{
    console.log(result);
    return result * 4;
})

// Output: 10 20


// RETURNING A Promise

p.then((result)=>{
    console.log(result);
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(result * 2);
        }, 3*1000)
    })
}).then((result)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(result * 3)
        }, 3 * 1000)
    })
}).then(result=> console.log(result));

// Modified Code

function generateNumber(num){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(num);
        }, 3 * 1000)
    });
}

generateNumber(10).then((result)=>{
    console.log(result);
    return generateNumber(result * 2);
}).then((result)=>{
    return generateNumber(result * 3);
}).then((result)=>{
    console.log(result);
});

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

function getService(user){
    return new Promise((resolve, reject)=>{
        console.log(`Get the services of ${user.username} from the user API.`);
        setTimeout(()=>{
            resolve(['Email', 'VPN', 'CDN'])
        }, 3*1000)
    });
}

function getServiceCost(services){
    return new Promise((resolve, reject)=>{
        console.log("Calculate the service cost of" + services);
        setTimeout(()=>{
            resolve(services.length * 100)
        }, 2 * 1000);
    })
}


getUser(10).then(getService).then(getServiceCost).then(console.log(("")))
