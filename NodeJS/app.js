const fs = require('fs');

let writeData = {
    name: "Tien",
    age: 20
}

//JSON
console.log("Start write file!");
fs.writeFile("test.txt", JSON.stringify(writeData), (err) => {
    console.log("Done");
});
console.log("End write file!");


console.log("Start write file sync!");
let fileDataSync = fs.readFileSync("test.txt", { encoding: "utf-8" });
console.log("Data: ", fileDataSync);
console.log("End write file sync!");


console.log("Start write file async!");
let fileData = fs.readFile(
    "test.txt", 
    { encoding: "utf-8" }, 
    (error, dataABC) => {
        // console.log("My name is " + JSON.parse(dataABC)["name"] + ", I'm " + JSON.parse(dataABC).age + "years old");
        console.log(`My name is ${JSON.parse(dataABC)["name"]}, I'm ${JSON.parse(dataABC).age} years old.`)
        return dataABC;
    }
);
console.log("Data: ", fileData);
console.log("End write file async!");