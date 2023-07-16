// DOM Selectors
const table = document.querySelector("#table");
const newBtn = document.querySelector("#new-game");
const screenScore = document.querySelector("#score");
const seconds = document.querySelector("#seconds");
const minutes = document.querySelector("#minutes");

// DOM Events
newBtn.addEventListener("click", () => newGame());

const pieces = [
  "./assets/img/bootstrap.svg",
  "./assets/img/bootstrap.svg",
  "./assets/img/css-3.svg",
  "./assets/img/css-3.svg",
  "./assets/img/html-5.svg",
  "./assets/img/html-5.svg",
  "./assets/img/javascript.svg",
  "./assets/img/javascript.svg",
  "./assets/img/mongodb.svg",
  "./assets/img/mongodb.svg",
  "./assets/img/express.svg",
  "./assets/img/express.svg",
  "./assets/img/nextjs-icon.svg",
  "./assets/img/nextjs-icon.svg",
  "./assets/img/react.svg",
  "./assets/img/react.svg",
];
let score = 0;
let gameInitiated = false;
// Using underscore.org shuffle method
let mixedPieces = [];

// Match function
const isMatch = () => {
  if (document.querySelectorAll(".piece-show").length > 1) {
    if (
      document.querySelectorAll(".piece-show")[0].innerHTML ==
      document.querySelectorAll(".piece-show")[1].innerHTML
    ) {
      document.querySelectorAll(".piece-show")[0].classList.add("piece-match");
      document.querySelectorAll(".piece-show")[1].classList.add("piece-match");
      document
        .querySelectorAll(".piece-show")[1]
        .classList.remove("piece-show");
      document
        .querySelectorAll(".piece-show")[0]
        .classList.remove("piece-show");
      score += 100;
      screenScore.innerText = score;

      if (
        document.querySelectorAll(".piece-match").length == mixedPieces.length
      ) {
        setTimeout(() => {
          alert(`Felicidades!! Ganaste! Tu puntaje fue: ${score}`);
        }, 200);
      }
      return;
    } else {
      document
        .querySelectorAll(".piece-show")[1]
        .classList.remove("piece-show");
      document
        .querySelectorAll(".piece-show")[0]
        .classList.remove("piece-show");
      if (score >= 50) {
        score -= 50;
        screenScore.innerText = score;
      }
    }
  }
};

// Shuffle and render pieces
const createSet = (pieces) => {
  mixedPieces = _.shuffle(pieces);
  mixedPieces.forEach((piece) => {
    const pieceContainer = document.createElement("DIV");
    pieceContainer.classList.add("piece");

    const image = document.createElement("IMG");
    image.setAttribute("src", `${piece}`);
    image.classList.add("sticker");

    pieceContainer.appendChild(image);
    table.appendChild(pieceContainer);
    if (gameInitiated === true) {
      pieceContainer.addEventListener("click", () => {
        pieceContainer.classList.add("piece-show");
        setTimeout(() => {
          isMatch();
        }, 300);
      });
    }
  });
};

// Countdown Timer
const startCountdown = (elementMin, elementSec, min, sec = 60) => {
  if (document.querySelectorAll(".piece-match").length == mixedPieces.length) {
    return;
  }
  if (min < 10) {
    elementMin.textContent = `0${min}`;
  } else {
    elementMin.textContent = `${min}`;
  }
  sec--;
  if (sec < 10) {
    console.log(`${min}:0${sec}`);
    elementSec.textContent = `0${sec}`;
    if (sec == 0) {
      if (sec === 0 && min === 0) {
        alert("Time is over...You Lose!");
        newBtn.setAttribute("disabled", false);
        return;
      }
      min--;
      sec = 60;
    }
  } else {
    console.log(`${min}:${sec}`);
    elementSec.textContent = `${sec}`;
  }
  setTimeout(() => {
    startCountdown(elementMin, elementSec, min, sec);
  }, 1000);
};

// Create a New Game
const newGame = () => {
  gameInitiated = true;
  table.innerHTML = ""; // Clean the DOM repetition of pieces
  createSet(pieces);
  startCountdown(minutes, seconds, 1);
  newBtn.setAttribute("disabled", "");
};

// Inicial table of pieces
window.onload = createSet(pieces);
