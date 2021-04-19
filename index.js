"use strict";

const beginGameBTN = document.getElementById("beginGameButton");

function beginGame(){
    location.href = "./game.html";
    console.log("Test");
}
console.log("Test2");

beginGameBTN.onclick = function () {
    console.log("Test");
    beginGame();
}   


