/*
PART 1
1. Create a function 'createImage' which receives a imgPath as an input. 
This function returns a promise which creates a new image (use document.createElement('img)) and sets a the src attribute to the provided image path. When the image is done loading, append it to the DOM element whith the 'images' class, and resolve the promise. The fullfilled value should be the image element itself. 
In case there is an error loading the image ('error' event), reject the promise.

PART 2
2. Consume the promise using the .then and also add an error handler.
3. After the image has loaded, pause execution after 2 seconds using the wait function
 we created earlier;
 4. After 2 second has passed, hide the current image (set display to none), and load a second imagge.
(HINT: Use the image element returned by the createImage promise to hide the current image, you will need a global variable for that).
5. After the second image has loaded, pause execution for 2 seconds again.
6. After the 2 seconds have paused, hide the current image.

*/

const wait = function(seconds){
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

const imgContainer = document.querySelector(".images");

function createImage(imgPath){
    return new Promise((resolve, reject)=>{
        const img = document.createElement("img");
        img.src = imgPath;
        img.style.transition = "transform 0.85s ease-in-out";

        img.addEventListener("load", ()=>{
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener("error", ()=>{
            reject(new Error("Image not found"))
        });
    });
}

const img1Url = "img/img-1.webp";
const img2Url ="img/img-2.webp";

let currentImg;

createImage(img1Url).then((img)=>{
    currentImg = img;
    console.log("Image 1 loaded")
    return wait(0.5)
}).then(()=>{
    currentImg.style.transform = "translateY(-120%)";
    // currentImg.style.display = "none";
    return createImage(img2Url)
}).then((img)=>{
    currentImg = img;
    console.log("Image 2 loaded")
    return wait(0.5)
}).then(()=>{
    currentImg.style.transform = "translateY(-120%)";
    // currentImg.style.display = "none";
})
.catch((error)=>{
    console.log(error);
})


