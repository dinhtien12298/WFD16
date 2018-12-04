const totalChar = 200;

// document.getElementById("textInput").addEventListener("input", function() {
//     let usedChar = document.getElementById("textInput").value.length;
//     let remainChar = totalChar - usedChar;
//     document.getElementById("remain").innerText = `Còn ${remainChar}/200 ký tự`;
// })

$("#textInput").on("input", function() {
    let usedChar = $("#textInput").val().length;
    let remainChar = totalChar - usedChar;
    $("#remain").text(`Còn ${remainChar}/200 ký tự`);
})