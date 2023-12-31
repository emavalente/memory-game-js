// DOM Selectors.
const appContainer = document.querySelector(".app-container");
const table = document.querySelector("#table");
const newBtn = document.querySelector("#new-game");
const screenScore = document.querySelector("#score");
const seconds = document.querySelector("#seconds");
const minutes = document.querySelector("#minutes");

// DOM EventListeners.
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
let score = 0; // score counter.
let gameInitiated = false; // state flag.

// Using underscore.org shuffle method.
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
          newBtn.removeAttribute("disabled", "");
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

// Shuffle and render pieces.
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

// Countdown Timer.
const startCountdown = (elementMin, elementSec, min, sec = 60) => {
  // Pieces Validation to stop the Countdown.
  if (document.querySelectorAll(".piece-match").length == mixedPieces.length) {
    return;
  }

  sec--;

  // Validation of seconds values to print seconds and discount minutes.
  if (sec < 10) {
    elementSec.textContent = `0${sec}`;
    if (sec == 0) {
      if (sec === 0 && min === 0 && elementSec.textContent == "00") {
        newBtn.removeAttribute("disabled", "");
        gameInitiated = false;
        alert("Time is over...You Lose!");
        return;
      }
      min--;
      sec = 60;
    }
  } else {
    elementSec.textContent = `${sec}`;
  }

  // Validation of minutes values to print .
  if (min < 10) {
    elementMin.textContent = `0${min}`;
  } else {
    elementMin.textContent = `${min}`;
  }

  // Recursion of startCountdown.
  setTimeout(() => {
    startCountdown(elementMin, elementSec, min, sec);
  }, 1000);
};

const getReadyMessage = () => {
  const getready = document.createElement("P");
  getready.classList.add("get-ready", "goUp");
  getready.textContent = "Get Ready";

  const go = document.createElement("P");
  go.classList.add("go", "beat");
  go.textContent = "GO!";

  appContainer.appendChild(getready);
  setTimeout(() => {
    getready.remove();
    appContainer.appendChild(go);
    setTimeout(() => {
      go.remove();
    }, 800);
  }, 2900);
};

// Create a New Game
const newGame = () => {
  getReadyMessage();
  setTimeout(() => {
    gameInitiated = true;
    table.innerHTML = ""; // Clean the DOM repetition of pieces.
    createSet(pieces);
    startCountdown(minutes, seconds, 1);
  }, 4000);

  newBtn.setAttribute("disabled", "");
};

// Inicial table of pieces.
window.onload = createSet(pieces);
