"use strict";
//This file contains javascript specific to the game.html file.

const ttsMuteIcon = document.getElementById("ttsMuteIcon");
const muteIcon = document.getElementById("muteIcon");
const scenarioImage = document.getElementById("scenarioImage");
const scenarioDescription = document.getElementById("scenarioDescription");
const scenarioBTN1 = document.getElementById("scenarioButton1");
const scenarioBTN2 = document.getElementById("scenarioButton2");
const playAgainBTN = document.getElementById("playAgain");
const returnBTN = document.getElementById("previousPage");
const muteBTN = document.getElementById("muteButton");

var muteAudioEffects = false;
var ttsMute = false;

var ttsmsg = new SpeechSynthesisUtterance();

var scenarios = [];
var indexStack = [0];

class Scenario {
  constructor(src = "", description = "", audio = "", children = []) {
    this.src = src;
    this.description = description;
    this.audio = audio;
    this.children = children;
  }

  getNumChildren() {
    return this.children.length;
  }

  getChild(index) {
    return this.children[index];
  }
}

class ScenarioChild {
  constructor(index, buttonText) {
    this.index = index;
    this.buttonText = buttonText;
  }
}

//Ask user for their name and load the initial scene for the game
initialiseScenarios(getName());
loadScenario(0);

function getName() {
  return prompt("Please enter your name: ");
}

function initialiseScenarios(name = "Alex") {
  scenarios = [
    //scenario: 0
    new Scenario(
      "images/bankImage.jpg",
      "Welcome to the Central Bank. What would you like to do?",
      "",
      [new ScenarioChild(1, "Leave"), new ScenarioChild(2, "Enter the bank")]
    ),
    //scenario: 1
    new Scenario(
      "images/motorway.jpg",
      "You chose to leave and drive away on the motorway back home.",
      "",
      []
    ),
    //scenario: 2
    new Scenario(
      "images/bankinside.jpg",
      "You've entered the bank. It's a large open room with multiple cashier desks. On the left is a family opening up their sons first account. On the right, an elderly couple. Now you must decide whether to rob the bank or carry on as normal?",
      "",
      [
        new ScenarioChild(3, "Rob the bank"),
        new ScenarioChild(4, "Deposit money"),
      ]
    ),
    //scenario: 3
    new Scenario(
      "images/bankinside.jpg",
      "You've decided to rob the bank! You take your gun out and threaten the cashier. You then move onto the next cashier and so on... but you begin to hear the faint sound of sirens in the distance. Someone has set of a panic alarm! What's your next move?",
      "audio/policeSiren.wav",
      [
        new ScenarioChild(5, "Take a hostage"),
        new ScenarioChild(6, "Run for the exit"),
      ]
    ),
    //scenario: 4
    new Scenario(
      "images/bankinside.jpg",
      "You approach the teller and begin the process of depositing money. However,  you notice the cashier beside you is in distress. As you look closer you notice the customer they are serving is holding a gun. What do you do?",
      "",
      [new ScenarioChild(9, "Intervene"), new ScenarioChild(10, "Walk away")]
    ),
    //scenario: 5
    new Scenario(
      "images/blockedDoor.jpg",
      "you've managed to barricade the entrance but that won't stop the police. You've decided to take a hostage as well. Who will you capture? The family or the elderly couple?",
      "",
      [new ScenarioChild(7, "Family"), new ScenarioChild(8, "Elderly Couple")]
    ),
    //scenario: 6
    new Scenario(
      "images/exit.jfif",
      "You hastily rush to the exit. The sirens are getting louder! There's no-one there yet. What's your next move?",
      "audio/policeSiren.wav",
      [
        new ScenarioChild(11, "Steal a motorbike"),
        new ScenarioChild(12, "Escape on foot"),
      ]
    ),
    //scenario: 7
    new Scenario(
      "images/police.jpg",
      `The police arrive... They knock down the door with battering rams. You're taking refuge in a back room with you hostage. You hear them yell "We know it's you ${name}! This is the last bank you'll ever rob. Put your hands in the air and turn yourself in! Do not harm the family and we will not shoot."`,
      "",
      [
        new ScenarioChild(
          13,
          "Use the child as a bullet shield and leave using the exit"
        ),
        new ScenarioChild(14, "Accept defeat"),
      ]
    ),
    //scenario: 8
    new Scenario(
      "images/police.jpg",
      `The police arrive... They knock down the door with battering rams. You're taking refuge in a back room with you hostage. You hear them yell "We know it's you ${name}! This is the last bank you'll ever rob. Put your hands in the air and turn yourself in! Do not harm the couple and we will not shoot."`,
      "",
      [new ScenarioChild(15, "say NO!"), new ScenarioChild(14, "Accept Defeat")]
    ),
    //scenario: 9
    new Scenario(
      "images/bankinside.jpg",
      `How do you want to continue? Will you phone the police discretely and report the man or attack take matters into your own hangs?`,
      "",
      [new ScenarioChild(17, "Phone police"), new ScenarioChild(18, "Fight")]
    ),
    //scenario: 10
    new Scenario(
      "images/walkaway.jpg",
      `You leave the bank feeling guilty. A sense of shame looms over your head.`,
      "",
      [new ScenarioChild(16, "continue")]
    ),
    //scenario: 11
    new Scenario(
      "images/sunset.jpg",
      `Somehow against all odds the keys were in the motorbike. The engine fires up and you ride off into the sunset.`,
      "",
      []
    ),
    //scenario: 12
    new Scenario(
      "images/policevan.JPG",
      `You run until you can't keep running. You're being chased by multiple officers and their dogs. Unfortunately cardio isn't your thing and the cops catch you. You've been read your rights and thrown in the back of a police van.`,
      "",
      []
    ),
    //scenario: 13
    new Scenario(
      "images/police.jpg",
      `The officers couldn't stop you without risking the life of the child. You're able to find a car in the street with its keys in the ignition. You drive off.`,
      "",
      [new ScenarioChild(21, "continue")]
    ),
    //scenario: 14
    new Scenario(
      "images/bankinside.jpg",
      `You know there's no shot you're escaping uninjured. You raise your arms in the air and turn yourself in.`,
      "",
      [new ScenarioChild(23, "continue")]
    ),
    //scenario: 15
    new Scenario(
      "images/bankinside.jpg",
      `You underestimated the elderly man, he turns in one motion and punches you in the face.`,
      "",
      [new ScenarioChild(24, "continue")]
    ),
    //scenario: 16
    new Scenario(
      "images/gunshot.jpeg",
      `As you turn the corner onto the adjacent street you hear gunshots from the bank. Part of you is thankful you weren't there and the other half knows you could've stopped it. You'll forever question if those deaths are on your hands.`,
      "audio/gunshot.mp3",
      []
    ),
    //scenario: 17
    new Scenario(
      "images/bankinside.jpg",
      `The police have been notified and you are encouraged to leave the building discretely.`,
      "",
      [new ScenarioChild(25, "continue")]
    ),
    //scenario: 18
    new Scenario(
      "images/bankinside.jpg",
      `As soon as you make the move you realise it was a mistake. The man was Ready for you.`,
      "",
      [new ScenarioChild(19, "continue")]
    ),
    //scenario: 19
    new Scenario(
      "images/gunshot.jpeg",
      `You hear a loud BANG! The man had pulled the trigger of his pistol at point blank range.`,
      "audio/gunshot.mp3",
      [new ScenarioChild(20, "continue")]
    ),
    //scenario: 20
    new Scenario(
      "images/nightmare.jpg",
      `You wake up in your room in a hot sweat. Immediately you check for gun shot wounds but there are none. Thankfully it was only a vivid dream.`,
      "",
      []
    ),
    //scenario: 21
    new Scenario(
      "images/sunset.jpg",
      `You realise you've not been followed. The kid is has been crying non-stop.`,
      "",
      [new ScenarioChild(22, "continue")]
    ),
    //scenario: 22
    new Scenario(
      "images/sunset.jpg",
      `You're finally a safe distance from the bank to leave the hostage. You feel for him so you drop him off at a bus stop with a small bundle of money and say to not tell the police. You're now free and clear to drive off with your prize`,
      "",
      []
    ),
    //scenario: 23
    new Scenario(
      "images/policecell.jpg",
      `You're taken into the police holding cell to await trial.`,
      "",
      []
    ),
    //scenario: 24
    new Scenario("images/knockedout.png", `You're knocked out cold.`, [
      new ScenarioChild(23, "continue"),
    ]),
    //scenario: 25
    new Scenario(
      "images/newspaper.jpg",
      `It's the next day. You pick up your morning newspaper are read the front page article titled. "Civilian saves the lives 10's of people in local bank heist. His quick actions of allerting the police allowed them to arrive on scene in record time". This leaves you feeling very proud of yourelf.`,
      "",
      []
    ),
  ];
}

ttsMuteIcon.onclick = function () {
  toggleTTSMute();
};

muteIcon.onclick = function () {
  toggleAudioMute();
};

scenarioImage.onmouseover = function () {
  audioFunction();
};

//activate TTS if the enabled.
scenarioDescription.onclick = function () {
  if (!ttsMute) {
    ttsmsg.text = scenarioDescription.textContent;
    window.speechSynthesis.speak(ttsmsg);
  }
};

//switch to the scene associtated with button 1.
scenarioBTN1.onclick = function () {
  try {
    loadScenario(
      scenarios[indexStack[indexStack.length - 1]].getChild(0).index
    );
    indexStack.push(
      scenarios[indexStack[indexStack.length - 1]].getChild(0).index
    );
    toggleButtonVisibility();
  } catch (error) {}
};

//switch to the scene associtated with button 2.
scenarioBTN2.onclick = function () {
  try {
    loadScenario(
      scenarios[indexStack[indexStack.length - 1]].getChild(1).index
    );
    indexStack.push(
      scenarios[indexStack[indexStack.length - 1]].getChild(1).index
    );
    toggleButtonVisibility();
  } catch (error) {}
};

//restart game.
playAgainBTN.onclick = function () {
  try {
    loadScenario(0);
    indexStack.push(0);
    toggleButtonVisibility();
  } catch (error) {}
};

//back page button.
returnBTN.onclick = function () {
  backPage();
  toggleButtonVisibility();
};

//build the scene for the current scenario
function loadScenario(index) {
  toggleButtonVisibility();

  const currentScenario = scenarios[index];
  scenarioImage.src = currentScenario.src;
  scenarioDescription.textContent = currentScenario.description;

  if (currentScenario.getNumChildren() === 2) {
    scenarioBTN1.textContent = currentScenario.getChild(0).buttonText;
    scenarioBTN2.textContent = currentScenario.getChild(1).buttonText;
  } else if (currentScenario.getNumChildren() === 1) {
    scenarioBTN1.textContent = currentScenario.getChild(0).buttonText;
  }
}

//ensure the correct buttons are visible.
function toggleButtonVisibility() {
  if (scenarios[indexStack[indexStack.length - 1]].getNumChildren() === 1) {
    scenarioBTN1.hidden = false;
    scenarioBTN2.hidden = true;
    returnBTN.hidden = false;
    playAgainBTN.hidden = true;
  } else if (
    scenarios[indexStack[indexStack.length - 1]].getNumChildren() === 0
  ) {
    scenarioBTN1.hidden = true;
    scenarioBTN2.hidden = true;
    playAgainBTN.hidden = false;
    returnBTN.hidden = false;
  } else if (indexStack[indexStack.length - 1] === 0) {
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

//mute the TTS audio.
function toggleTTSMute() {
  ttsMute = !ttsMute;
  if (!ttsMute) {
    ttsMuteIcon.src = "icons/tts.png";
  } else {
    ttsMuteIcon.src = "icons/ttsMute.png";
  }
}

//mute the Sound effects audio.
function toggleAudioMute() {
  muteAudioEffects = !muteAudioEffects;
  if (!muteAudioEffects) {
    muteIcon.src = "icons/notMute.png";
  } else {
    muteIcon.src = "icons/mute.png";
  }
}

//return to the previous page.
function backPage() {
  if (indexStack.length > 1) {
    indexStack.pop();
    loadScenario(indexStack[indexStack.length - 1]);
  }
}

//Determine whether to play audio when hovering over an image.
function audioFunction() {
  var pageAudio = scenarios[indexStack[indexStack.length - 1]].audio;

  if (pageAudio != "") {
    var curAudio = new Audio(pageAudio);
    curAudio.play();
  }
}
