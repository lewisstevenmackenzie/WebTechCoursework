"use strict";

const beginGameBTN = document.getElementById("beginGameButton");

function beginGame() {
  location.href = "./game.html";
}

beginGameBTN.onclick = function () {
  beginGame();
};
