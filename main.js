import bootstrap from "./assets/img/bootstrap.svg";
import css from "./assets/img/css-3.svg";
import html from "./assets/img/html-5.svg";
import javascript from "./assets/img/javascript.svg";
import typescript from "./assets/img/typescript.svg";
import mongo from "./assets/img/mongodb.svg";
import nextjs from "./assets/img/nextjs-icon.svg";
import nodejs from "./assets/img/nodejs-icon.svg";
import react from "./assets/img/react.svg";
import redux from "./assets/img/redux.svg";
import sass from "./assets/img/sass.svg";
import tailwind from "./assets/img/tailwindcss.svg";
import vite from "./assets/img/vitejs.svg";
import figma from "./assets/img/figma.svg";
import express from "./assets/img/express.svg";

const pieces = [
  bootstrap,
  bootstrap,
  css,
  css,
  html,
  html,
  javascript,
  javascript,
  //   typescript,
  //   typescript,
  mongo,
  mongo,
  express,
  express,
  //   nextjs,
  //   nextjs,
  nodejs,
  nodejs,
  react,
  react,
  //   redux,
  //   redux,
  //   sass,
  //   sass,
  //tailwind,
  // tailwind,
  //vite,
  //vite,
  //   figma,
  //   figma,
];

// Using underscore.org shuffle method
let mixedPieces = [];

// DOM Selectors
const table = document.querySelector("#table");
const newBtn = document.querySelector("#new-game");
const screenScore = document.querySelector("#score");

// DOM Events
newBtn.addEventListener("click", () => newGame());

let score = 0;

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
      // document
      //   .querySelectorAll(".piece-match")[1]
      //   .removeEventListener("click", () => {});
      // document
      //   .querySelectorAll(".piece-match")[0]
      //   .removeEventListener("click", () => {});
      score += 100;
      screenScore.innerText = score;

      if (
        document.querySelectorAll(".piece-match").length == mixedPieces.length
      ) {
        setTimeout(() => {
          alert(`Felicidades!! Ganaste! Tu puntaje fue: ${score}`);
        }, 200);
      }
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

    pieceContainer.addEventListener("click", () => {
      pieceContainer.classList.add("piece-show");
      setTimeout(() => {
        isMatch();
      }, 500);
    });
  });
};

// Set the Timer
let s = 60;

const setTimer = () => {
  s--;
  if (s < 10) {
    console.log(`0${s}`);
    if (s == 0) {
      alert("Se termino el conteo");
      return;
    }
  } else {
    console.log(s);
  }
  setTimeout(() => {
    setTimer();
  }, 1000);
};

// Create a New Game
const newGame = () => {
  table.innerHTML = "";
  createSet(pieces);
  setTimer(1);
};

// Start the Game
window.onload = createSet(pieces);
