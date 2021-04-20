"use strict";

//This file contains javascript related to the index.html file.

const beginGameBTN = document.getElementById("beginGameButton");

//changes location to the game page.
function beginGame() {
  location.href = "./game.html";
}

beginGameBTN.onclick = function () {
  try {
    beginGame();
  } catch (error) {}
};
