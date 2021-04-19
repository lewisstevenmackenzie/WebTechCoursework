"use strict";

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

initialiseScenarios(getName());
loadScenario(0);

function getName() {
  return prompt("PLZ enter your name: ");
}

function initialiseScenarios(name = "Alex") {
  scenarios = [
    {
      //scenario: 0
      src: "images/bankImage.jpg",
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
      src: "images/motorway.jpg",
      description:
        "You chose to leave and drive away on the motorway back home.",
      children: [],
    },
    {
      //scenario: 2
      src: "images/bankinside.jpg",
      description:
        "You've entered the bank. It's a large open room with multiple cashier desks. On the left is a family opening up their sons first account. On the right, an elderly couple. Now you must decide whether to rob the bank or carry on as normal?",
      children: [
        {
          index: 3,
          buttonText: "Rob the bank",
        },
        {
          index: 4,
          buttonText: "Deposit money",
        },
      ],
    },
    {
      //scenario: 3
      src: "images/bankinside.jpg",
      description:
        "You've decided to rob the bank! You take your gun out and threaten the cashier. You then move onto the next cashier and so on... but you begin to hear the faint sound of sirens in the distance. Someone has set of a panic alarm! What's your next move?",
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
      src: "images/bankinside.jpg",
      description:
        "You approach the teller and begin the process of depositing money. However,  you notice the cashier beside you is in distress. As you look closer you notice the customer they are serving is holding a gun. What do you do?",
      children: [
        {
          index: 9,
          buttonText: "Intervene",
        },
        {
          index: 10,
          buttonText: "walk away",
        },
      ],
    },
    {
      //scenario: 5
      src: "images/blockedDoor.jpg",
      description:
        "you've managed to barricade the entrance but that won't stop the police. You've decided to take a hostage as well. Who will you capture? The family or the elderly couple?",
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
      src: "images/exit.jfif",
      description:
        "You hastily rush to the exit. The sirens are getting louder! There's no-one there yet. What's your next move?",
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
      src: "images/police.jpg",
      description: `The police arrive... They knock down the door with battering rams. You're taking refuge in a back room with you hostage. You hear them yell "We know it's you ${name}! This is the last bank you'll ever rob. Put your hands in the air and turn yourself in! Do not harm the family and we will not shoot."`,
      children: [
        {
          index: 13,
          buttonText:
            "Use the child as a bullet shield and leave using the exit.",
        },
        {
          index: 14,
          buttonText: "Accept Defeat",
        },
      ],
    },
    {
      //scenario: 8
      src: "images/police.jpg",
      description: `The police arrive... They knock down the door with battering rams. You're taking refuge in a back room with you hostage. You hear them yell "We know it's you ${name}! This is the last bank you'll ever rob. Put your hands in the air and turn yourself in! Do not harm the couple and we will not shoot."`,
      children: [
        {
          index: 15,
          buttonText: "Say no! ",
        },
        {
          index: 14,
          buttonText: "Accept Defeat",
        },
      ],
    },
    {
      //scenario: 9
      src: "images/bankinside.jpg",
      description: `How do you want to continue? Will you phone the police discretely and report the man or attack take matters into your own hangs?`,
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
      src: "images/walkaway.jpg",
      description: `You leave the bank feeling guilty. A sense of shame looms over your head.`,
      children: [
        {
          index: 16,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 11
      src: "images/sunset.jpg",
      description: `Somehow against all odds the keys were in the motorbike. The engine fires up and you ride off into the sunset.`,
      children: [],
    },
    {
      //scenario: 12
      src: "images/policevan.jpg",
      description: `You run until you can't keep running. You're being chased by multiple officers and their dogs. Unfortunately cardio isn't your thing and the cops catch you. You've been read your rights and thrown in the back of a police van.`,
      children: [],
    },
    {
      //scenario: 13
      src: "images/police.jpg",
      description: `The officers couldn't stop you without risking the life of the child. You're able to find a car in the street with its keys in the ignition. You drive off.`,
      children: [
        {
          index: 21,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 14
      src: "images/bankinside.jpg",
      description: `You know there's no shot you're escaping uninjured. You raise your arms in the air and turn yourself in.`,
      children: [
        {
          index: 23,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 15
      src: "images/bankinside.jpg",
      description: `You underestimated the elderly man, he turns in one motion and punches you in the face.`,
      children: [
        {
          index: 24,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 16
      src: "images/walkaway.jpg",
      description: `As you turn the corner onto the adjacent street you hear gunshots from the bank. Part of you is thankful you weren't there and the other half knows you could've stopped it. You'll forever question if those deaths are on your hands.`,
      children: [],
    },
    {
      //scenario: 17
      src: "images/bankinside.jpg",
      description: `The police have been notified and you are encouraged to leave the building discretely.`,
      children: [
        {
          index: 25,
          buttonText: "contine",
        },
      ],
    },
    {
      //scenario: 18
      src: "images/bankinside.jpg",
      description: `AS soon as you make the move you realise it was a mistake. The man was Ready for you.`,
      children: [
        {
          index: 19,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 19
      src: "images/gunshot.jpeg",
      description: `You hear a loud BANG! The man had pulled the trigger of his pistol at point blank range.`,
      children: [
        {
          index: 20,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 20
      src: "images/nightmare.jpg",
      description: `You wake up in your room in a hot sweat. Immediately you check for gun shot wounds but there are none. Thankfully it was only a vivid dream.`,
      children: [],
    },
    {
      //scenario: 21
      src: "images/sunset.jpg",
      description: `You realise you've not been followed. The kid is has been crying non-stop.`,
      children: [
        {
          index: 22,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 22
      src: "images/sunset.jpg",
      description: `You're finally a safe distance from the bank to leave the hostage. You feel for him so you drop him off at a bus stop with a small bundle of money and say to not tell the police. You're now free and clear to drive off with your prize`,
      children: [],
    },
    {
      //scenario: 23
      src: "images/policecell.jpg",
      description: `You're taken into the police holding cell to await trial.`,
      children: [],
    },
    {
      //scenario: 24
      src: "images/knockedout.png",
      description: `You're knocked out cold.`,
      children: [
        {
          index: 23,
          buttonText: "continue",
        },
      ],
    },
    {
      //scenario: 25
      src: "images/newspaper .jpg",
      description: `It's the next day. You pick up your morning newspaper are read the front page article titled. "Civilian saves the lives 10's of people in local bank heist. His quick actions of allerting the police allowed them to arrive on scene in record time". This leaves you feeling very proud of yourelf.`,
      children: [],
    },
  ];
}

ttsMuteIcon.onclick = function () {
  toggleTTSMute();
};

muteIcon.onclick = function () {
  toggleAudioMute();
};

scenarioDescription.onclick = function () {
  if (!ttsMute) {
    ttsmsg.text = scenarioDescription.textContent;
    window.speechSynthesis.speak(ttsmsg);
  }
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
  if (scenarios[indexStack[indexStack.length - 1]].children.length === 1) {
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

function toggleTTSMute() {
  ttsMute = !ttsMute;
  if (!ttsMute) {
    ttsMuteIcon.src = "icons/tts.png";
  } else {
    ttsMuteIcon.src = "icons/ttsMute.png";
  }
}

function toggleAudioMute() {
  muteAudioEffects = !muteAudioEffects;
  if (!muteAudioEffects) {
    muteIcon.src = "icons/notMute.png";
  } else {
    muteIcon.src = "icons/mute.png";
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
    if (!muteAudioEffects) {
      var aAdudio = new Audio("audio/beep-01a.mp3");
      var PoliceSirenAudio = new Audio("audio/policeSiren.wav");
      var gunshot = new Audio("audio/gunshot.mp3");

      if (page === 3 || page === 6) {
        PoliceSirenAudio.play();
      } else if (page === 19) {
        gunshot.play();
      }
    }
  } catch (error) {}
}
