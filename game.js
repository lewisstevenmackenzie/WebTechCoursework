"use strict";
const muteIcon = document.getElementById("muteIcon");
const scenarioImage = document.getElementById("scenarioImage");
const scenarioDescription = document.getElementById("scenarioDescription");
const scenarioBTN1 = document.getElementById("scenarioButton1");
const scenarioBTN2 = document.getElementById("scenarioButton2");
const playAgainBTN = document.getElementById("playAgain");
const returnBTN = document.getElementById("previousPage");
const muteBTN = document.getElementById("muteButton");
var isMuted = false;

var scenarios = [];
var indexStack = [0];

initialiseScenarios(getName());
loadScenario(0);

function getName() {
  return prompt("PLZ enter your name: ");
}

function initialiseScenarios(name = "Alex") {
  scenarios = [
    {
      //scenario: 0
      src: "./images/bankImage.jpg",
      description: "Welcome to the Central Bank. What would you like to do?",
      children: [
        {
          index: 1,
          buttonText: "Leave",
        },
        {
          index: 2,
          buttonText: "Enter the bank",
        },
      ],
    },
    {
      //scenario: 1
      src: "./images/motorway.jpg",
      description: "You chose to leave and drive away",
      story: "this is an update to the plot",
      children: [],
    },
    {
      //scenario: 2
      src: "./images/motorway.jpg",
      description: "You've entered the bank. what do you do next?",
      children: [
        {
          index: 3,
          buttonText: "Rob the cashier",
        },
        {
          index: 4,
          buttonText: "Deposit money",
        },
      ],
    },
    {
      //scenario: 3
      src: "./images/motorway.jpg",
      description:
        "You're holding the cashier at gun point but you hear the faint sound of sirens in the distance. What do you do?",
      children: [
        {
          index: 5,
          buttonText: "Take a hostage",
        },
        {
          index: 6,
          buttonText: "Run for the exit",
        },
      ],
    },
    {
      //scenario: 4
      src: "./images/motorway.jpg",
      description:
        "You're depositing money but you notice the cashier besdie you is in distress. You notice the customer is holding a gun. What do you do?",
      children: [
        {
          index: 9,
          buttonText: "intervene",
        },
        {
          index: 10,
          buttonText: "walk away",
        },
      ],
    },
    {
      //scenario: 5
      src: "./images/motorway.jpg",
      description: "Do you take the a family hostage or an elderly couple?",
      children: [
        {
          index: 7,
          buttonText: "Family",
        },
        {
          index: 8,
          buttonText: "Elderly Couple",
        },
      ],
    },
    {
      //scenario: 6
      src: "./images/motorway.jpg",
      description: "You make it to the exit. What's you next move?",
      children: [
        {
          index: 11,
          buttonText: "Steal a motorbike",
        },
        {
          index: 12,
          buttonText: "Escape on foot",
        },
      ],
    },
    {
      //scenario: 7
      src: "./images/motorway.jpg",
      description: `The police arrive... We know it's you
          ${name}. Put your hands in the air! Leave the family alone`,
      children: [
        {
          index: 13,
          buttonText: "Use the child as a shield and leave using the exit.",
        },
        {
          index: 14,
          buttonText: "Accept Defeat",
        },
      ],
    },
    {
      //scenario: 8
      src: "./images/motorway.jpg",
      description: `The police arrive... We know it's you ${name}. Put your hands in the air! Let the couple go.`,
      children: [
        {
          index: 15,
          buttonText: "Say no! ",
        },
        {
          index: 14,
          buttonText: "accept Defeat",
        },
      ],
    },
    {
      //scenario: 9
      src: "./images/motorway.jpg",
      description: `Do you phone the police or tackle the robber?`,
      children: [
        {
          index: 17,
          buttonText: "Phone police",
        },
        {
          index: 18,
          buttonText: "Fight",
        },
      ],
    },
    {
      //scenario: 10
      src: "./images/motorway.jpg",
      description: `You leave the bank feeling guilty.`,
      children: [
        {
          index: 16,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 11
      src: "./images/motorway.jpg",
      description: `Somehow you managed to escape against all odds. you ride off into the sunset`,
      children: [],
    },
    {
      //scenario: 12
      src: "./images/motorway.jpg",
      description: `You run until you can't keep running. Unfortunately cardio isn't you thing and the cops catch you.`,
      children: [],
    },
    {
      //scenario: 13
      src: "./images/motorway.jpg",
      description: `you leave with the child and get in a Car and drive away.`,
      children: [
        {
          index: 21,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 14
      src: "./images/motorway.jpg",
      description: `You raise your arms in the air.`,
      children: [
        {
          index: 23,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 15
      src: "./images/motorway.jpg",
      description: `The elderly man Turns and punches you in the face.`,
      children: [
        {
          index: 19,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 16
      src: "./images/motorway.jpg",
      description: `You hear gunshots. Part of you is thankful you weren't there and the other half knows you could've stopped it.`,
      children: [],
    },
    {
      //scenario: 17
      src: "./images/motorway.jpg",
      description: `The police are on there way.`,
      children: [],
    },
    {
      //scenario: 18
      src: "./images/motorway.jpg",
      description: `The man was Ready for you.`,
      children: [
        {
          index: 19,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 19
      src: "./images/motorway.jpg",
      description: `He pulls the trigger.`,
      children: [
        {
          index: 20,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 20
      src: "./images/motorway.jpg",
      description: `You wake up in your room, no gun shot wounds. you realise it was all a vivid dream.`,
      children: [],
    },
    {
      //scenario: 21
      src: "./images/motorway.jpg",
      description: `You weren't followed.`,
      children: [
        {
          index: 22,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 22
      src: "./images/motorway.jpg",
      description: `You leave the hostage at a bus stop and drive off with your prize`,
      children: [],
    },
    {
      //scenario: 23
      src: "./images/motorway.jpg",
      description: `You're taken into the police holding cell to await trial.`,
      children: [],
    },
  ];
}

muteIcon.onclick = function () {
  toggleAudioMute();
};

scenarioBTN1.onclick = function () {
  try {
    loadScenario(
      scenarios[indexStack[indexStack.length - 1]].children[0].index
    );
    indexStack.push(
      scenarios[indexStack[indexStack.length - 1]].children[0].index
    );
    toggleButtonVisibility();
  } catch (error) {}
};

scenarioBTN2.onclick = function () {
  try {
    loadScenario(
      scenarios[indexStack[indexStack.length - 1]].children[1].index
    );
    indexStack.push(
      scenarios[indexStack[indexStack.length - 1]].children[1].index
    );
    toggleButtonVisibility();
  } catch (error) {}
};

playAgainBTN.onclick = function () {
  try {
    loadScenario(0);
    indexStack.push(0);
    toggleButtonVisibility();
  } catch (error) {}
};

returnBTN.onclick = function () {
  backPage();
  toggleButtonVisibility();


};

function loadScenario(index) {
  toggleButtonVisibility();

  const currentScenario = scenarios[index];
  scenarioImage.src = currentScenario.src;
  scenarioDescription.textContent = currentScenario.description;

  if (currentScenario.children.length === 2) {
    scenarioBTN1.textContent = currentScenario.children[0].buttonText;

    scenarioBTN2.textContent = currentScenario.children[1].buttonText;
  } else if (currentScenario.children.length === 1) {
    scenarioBTN1.textContent = currentScenario.children[0].buttonText;
  }
}

function toggleButtonVisibility() {
  if (
    scenarios[indexStack[indexStack.length - 1]].children.length === 1
  ) {
    scenarioBTN1.hidden = false;
    scenarioBTN2.hidden = true;
    returnBTN.hidden = false;
    playAgainBTN.hidden = true;
  } else if (
    scenarios[indexStack[indexStack.length - 1]].children.length === 0
  ) {
    scenarioBTN1.hidden = true;
    scenarioBTN2.hidden = true;
    playAgainBTN.hidden = false;
    returnBTN.hidden = false;
  } else if (
    indexStack[indexStack.length - 1] === 0
  ) {
    console.log("Hello")
    scenarioBTN1.hidden = false;
    scenarioBTN2.hidden = false;
    returnBTN.hidden = true;
    playAgainBTN.hidden = true;
  } else {
    scenarioBTN1.hidden = false;
    scenarioBTN2.hidden = false;
    playAgainBTN.hidden = true;
    returnBTN.hidden = false;
  }
}

function toggleAudioMute() {
  isMuted = !isMuted;

  if (!isMuted) {
    muteIcon.src = "./images/notMute.png";
  } else {
    muteIcon.src = "./images/mute.png";
  }
}

function backPage() {
  if (indexStack.length > 1) {
    indexStack.pop();
    loadScenario(indexStack[indexStack.length - 1]);
  }
}

function audioFunction() {
  var page = indexStack[indexStack.length - 1];

  try {
    if (!isMuted) {
      var aAdudio = new Audio("./audio/beep-01a.mp3");

      var PoliceSirenAudio = new Audio("./audio/policeSiren.wav");

      if (page === 0) {
        aAdudio.play();
      } else if (page === 1) {
        PoliceSirenAudio.play();
      }
    }
  } catch (error) {}
}
