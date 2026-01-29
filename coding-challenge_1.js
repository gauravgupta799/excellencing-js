// ======== Coding-Challenge_1 ======
/*
Let's say you are building a time tracking application for greelancers. At some point building this app, you need a function that receives daily work hours for a certain week and returns:
1. Total hours worked (Calcalue the total hours)
2. Average daily hours (Calculate the average of hours)
3. The day with the most hours worked (Find the maxValue from the array)
4. Number of the days worked (Find how many days worked by implementing the condition to check hours > 0)
5. Whether the week was full time (worked 35 hours or more) (Write a condition to check that If total hours is greater or equal to 35 or not)
6. Array of daily hours shouldn't less than 7

TEST DATA: [7.5, 8, 6.5, 0, 8.5, 4, 0]
*/

function trackWeekHours(dailyHours){
    const daysName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
 
    // Check is array or not or greater than 7
    if(!Array.isArray(dailyHours) || dailyHours.length !== 7 ) throw new Error("Input must be an array of exactly 7 daily work hours.");

    // Total hours
    const totalHours = dailyHours.reduce((sum, hours)=> sum + hours, 0);

    // Average
    const averageHours = Math.round((totalHours/dailyHours.length) * 10) / 10;

    // MaxHours
    const maxHours = Math.max(...dailyHours);
    const maxDayWorked = daysName[dailyHours.indexOf(maxHours)];

    // Count the number of days worked
    const daysWorked = dailyHours.filter((hours) => hours > 0).length;
    // console.log(daysWorked)

    // isFullTime
    let fullTimeValue = 35
    const isFullTimeWorked = totalHours >= fullTimeValue;

    return { totalHours, averageHours, maxDayWorked, daysWorked, isFullTimeWorked}
}

const dailyHours = [7.5, 8, 6.5, 0, 7, 4, 0];
const result = trackWeekHours(dailyHours);
console.log(result);