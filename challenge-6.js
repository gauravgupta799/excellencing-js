// Write a function to convert headings to Title case while excluding the articles, conjuctions, prepositions and infinitive words.

function toTitleCase(str){
     const lowerWords = [
        "a","an","the",
        "and","but","or","nor","for","so","yet",
        "at","by","in","of","off","on","per","to","up","via","as",
        "am","is","are","was","were","be","being","been",
        "do","does","did",
        "have","has","had",
        "will","would","shall","should",
        "may","might","must","can","could"
    ];
    const result = str.toLowerCase().split(" ").map((word, index)=>{
        if(index === 0 || !lowerWords.includes(word)){
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    }).join(" ");

    return result;
}

const heading = "the quick guide to learning javascript in the browser."
console.log(toTitleCase(heading));