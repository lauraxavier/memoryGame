import { startGame } from "./game.js";

const $overlay = document.getElementsByClassName("overlay")[0];
const $modalPlayerName = document.getElementById("modal-player-name");
const $modalStartLevel = document.getElementById("modal-start-level");
const $playerNameTitle = document.getElementById("player-name-title");
const $easy = document.getElementById("easy");
const $medium = document.getElementById("medium");
const $difficult = document.getElementById("difficult");
const $sendName = document.getElementById("send-name");
const $playerName = document.getElementById("player-name");

$sendName.addEventListener("click", function (event) {
    event.preventDefault();
    const playerName = $playerName.value;
    localStorage.setItem("name", playerName);
    $playerNameTitle.textContent = `Olá, ${playerName} !`;
    $modalPlayerName.style.display = "none";
    $modalStartLevel.style.display = "flex";
});

$easy.addEventListener("click", () => {
    startGame("easy");
    localStorage.setItem("level", "easy");
    $overlay.classList.add("displayNone");
});

$medium.addEventListener("click", () => {
    startGame("medium");
    localStorage.setItem("level", "medium");
    $overlay.classList.add("displayNone");
});

$difficult.addEventListener("click", () => {
    localStorage.setItem("level", "difficult");
    startGame("difficult");
    $overlay.classList.add("displayNone");
});
