/*
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

-------
PART 1
-------
1. Create a function "WhereAmI" which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).

2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API "" to do reverse geocoding.

API: "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}"

Use the fetch api to get the data. Don't use the getJSON funtion we created, that is cheating

3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then using this data log a message like this to the console: "You are in Berlin, Germany"

4. Chain a .catch method to the end of the promise chain and log the errors to the console

5. This API allows you to make only 3 requests per second. If you reload fast, you get this error with code 403. This is an error with the request.
Remember, fetch() doesn't reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

-------
PART:2
-------

6. Now it's time to use receive data to render a country. So take the relevent attribute from the  geocoding API result, and plug it into the countries API that we have been using.

7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code).


TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 3: -33.933, 18.474
*/

// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=37.42159&longitude=-122.0837


const apiURL ="https://api.bigdatacloud.net/data/reverse-geocode-client";

function whereAmI(lat, long){
    fetch(`${apiURL}?latitude=${lat}&longitude=${long}`)
    .then((response)=>{
        if(!response.ok) throw new Error("Not Found Geolocation")
        return response.json();
    })
    .then((data)=> {
        const {city, countryName, continent} = data;
        const printMsg = `You are in ${city}, ${countryName}, ${continent}`;
        console.log(printMsg);

        return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    })
    .then(res => {
        if(!res.ok) throw new Error("Country Not Found: " +  res.status)
            return res.json();
    })
    .then(countryData => console.log(countryData))
    .catch((error)=>{
        console.log(error.message);
    })
}

whereAmI(52.508, 13.381)
// whereAmI(19.037, 72.873)
// whereAmI(-33.933, 18.474)