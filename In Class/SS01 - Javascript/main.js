// console.log("Hello Daddy!!");

// // Khai báo biến (3 cách)
// const a = 5; // Hằng 
// var b = 6; // Biến 
// console.log(b); // 6
// b = "Hello!"
// console.log(b); // Hello
// let c = 8;

// // Kiểu dữ liệu
// c = "Surprise mother fucker"
// console.log(typeof c); // string
// console.log(typeof abc); // undefined

// var objA = {
//     age: 5,
//     name: "Huy"
// }; // Object
// objA.age = 22;
// objA.role = "Admin";
// console.log("Obj A: ", objA);

// var objB = {};
// objB.age = 18;
// objB.name = "Huy";
// console.log("Obj B: ", objB);
// console.log(objB["age"]);

// var arr = [1, 2, 3, 4, 55, 11]; // Array
// console.log(arr);
// arr.push(1000); // Thêm
// console.log(arr);
// arr.slice(2, 5); // Cắt mảng cũ ra
// console.log(arr.slice(2, 5));

// // Function - Cách khai báo thứ nhất
// function functionName(paramA, paramB) {
//     console.log(paramA);
//     console.log(paramB);
// } 
// functionName();
// functionName(5);
// functionName(3, 4);

// // Đưa Function vào biến nên phải khai báo
// // Cách khai báo thứ hai
// const functionName2 = function(paramA, paramB) {
//     console.log(paramA);
//     console.log(paramB);
// } 
// functionName2();

// // Cách khai báo thứ ba
// const functionName3 = (paramA, paramB) => {
//     console.log(paramA);
//     console.log(paramB);
// } 
// functionName3();

// var num = 5.8888;
// num.toFixed(2);
// (3.4444).toFixed(2);
// "ASDAVAD".toLowerCase;

// let date = new Date();
// console.log(date)
// date.getDate();
// date.getFullYear();
// date.getMonth(); 


// Function scope
// var a = 5;

// function print() {
//     var b = 6;

//     function c() {
//         d = 8;

//         console.log(a); //5
//         console.log(b);
//         console.log(d);
//     }
//     console.log(a); //5
//     console.log(b); //6
// }

// print()

// console.log(a); //5
// console.log(b); //undefined
// console.log(d); //8

// var: Function scope
// let: Block scope {}

// function countDown(count) {
//     for(let i = count; i >= 0; i--) {
//         setTimeout(function(){
//             console.log(i);
//         }, (count - i)*1000 );
//     }
// }

function print(i, time) {
    setTimeout(function(){
        console.log(i);
    }, time);
}

function countDown(count) {
    for(var i = count; i >= 0; i--) {
        print(i, (count - i)*1000);
    }
}

countDown(5);