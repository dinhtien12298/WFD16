const fs = require("fs");

let writeData = {
    name: "Tien",
    age: 20
}

//JSON
// console.log(JSON.stringify(writeData));

// console.log("Start WriteFile!");
// fs.writeFile("text.txt", JSON.stringify(writeData), (err) => {
//     console.log("Done!");
// });
// console.log("End WriteFile!");

// console.log("Start read file sync!");
// let fileData = fs.readFileSync("text.txt", "utf-8");
// console.log("Data: ", fileData);
// console.log("End read file sync!");

console.log("Start read file async!");
let fileDataASync = fs.readFile(
    "text.txt",
    "utf-8",
    (err, data) => {
        // console.log("I'm " + JSON.parse(data).name + ", I'm " + JSON.parse(data).age + " years old");
        console.log(`I'm ${JSON.parse(data).name}, I'm ${JSON.parse(data).age} years old`);
        return data;
    }
);
console.log("End read file async!");