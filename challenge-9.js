/* 
PART 1:
Write an async function 'loadNPause' that recreates coding challenge #2, this time using async/await (only the part where the promise is consumed).
Compare the two versionsm thing about the big differences, and see which ine you like more. 
Don't forgoet to rest the error handle, and to set the netwrok spped to 'Fast 3G' in the dev tools Network tab.


PART 2:
1. Creat an async function 'loadAll' that receives an array of image paths 'imgArr'
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator fucntion to actually (It has the images from the array)
5. Add the 'parallel' class to all the images (it has some CSS styles).

*/

const wait = function(seconds){
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    });
}

const imgContainer = document.querySelector(".images");

const createImage=(imgPath)=>{
    return new Promise((resolve, reject)=>{
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', ()=>{
            imgContainer.append(img);
            resolve(img);
        })
        img.addEventListener('error', ()=>{
            reject(new Error('image not found'))
        })
    })
}


const loadNPause = async ()=>{
    try {
        // Load image 1
        let img= await createImage('img/img-1.webp');
        console.log("Image 1 loaded");
        await wait(2);
        img.style.display = "none";

        // Load image 2
        img = await createImage('img/img-2.webp');
        console.log("Image 2 loaded");
        await wait(2);
        img.style.display = "none";

    } catch (error) {
        console.log(error)   
    }
}
loadNPause();

// Part 2 
const loadAll = async (imgArr)=>{
    try {
        const imgs = imgArr.map(async (img) => await createImage(img));
        const imgEl = await Promise.all(imgs);
        console.log(imgEl)
        imgEl.forEach(img=> img.classList.add("parallel"));
    } catch (error) {
        console.error(error)
        
    }
}

loadAll(['img/img-1.webp', 'img/img-2.webp'])
