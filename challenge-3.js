/* 
1. Create an array 'events' of the different game events that happened (No duplicates)
2. After the game has finished, was found that the yellow card from the minute 64 was unfair. So remove this event from the game events log.
3.Print the following string to the console: "An event happened, on average, every 9 minutes" (Keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
    [FIRST HALF] 17: ⚽ GOAL
*/

const gameEvents = new Map([
    [17, "⚽ GOAL"],
    [36, "🚫 Substitution"],
    [47, "⚽ GOAL"],
    [61, "🚫 Substitution"],
    [64, "🔶 Yellow Card"],
    [69, "🟥 Red Card"],
    [70, "🚫 Substitution"],
    [72 ,"🚫 Substitution"],
    [80, "⚽ GOAL"],
    [76, "⚽ GOAL"],
    [92, "🔶 Yellow Card"]
]);

// 1
const events = [...new Set(gameEvents.values())];
console.log("Evnets: ",events);

// 2
gameEvents.delete(64);

// 3
const message1 = `An event happened, on every ${90/gameEvents.size} minutes`;
console.log(message1);

const time = [...gameEvents.keys()];
const lastValueofTime = time.length - 1;
console.log(lastValueofTime);

const message2 = `An event happened, on average, every ${lastValueofTime / gameEvents.size} minutes`;
console.log(message2);

// 4
for (const [min, event] of gameEvents){
    const half = min <= 45 ? "FIRST" : "SECOND";
    const printMessage = `[${half} HALF] ${min}: ${event}`;
    console.log(printMessage);
}
