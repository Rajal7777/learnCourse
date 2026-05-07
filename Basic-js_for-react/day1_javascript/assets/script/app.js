// import { apiKey } from "./utils.js";

// import apiKey from "./utils.js";

// console.log(apiKey);

const hobbies = ["Reading", "Traveling", "Gaming"];

hobbies.push("Cooking");

console.log(hobbies);

// const findIndex = hobbies.findIndex((item) => {
//     return item === "Gaming";
// });

const findIndex = hobbies.findIndex(item => item === "Gaming")
console.log(findIndex);

const mapItem = hobbies.map(item => `#${item}`);
console.log(mapItem); 

//we can add objects in the array 
const addObj = hobbies.map(item => ({hobbies: item}));
console.log(addObj);

console.log("this is the last hobbie", hobbies);


const food = [ "Pizza", "Burger", "Pasta"];
for (const item of food) {
    console.log(item + " chicken")
}