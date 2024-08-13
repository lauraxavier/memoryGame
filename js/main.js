import { startGame } from "./game.js";
import * as elements from "./elements.js";

elements.$sendName.addEventListener("click", function (event) {
    event.preventDefault();
    const playerName = elements.$playerName.value;
    localStorage.setItem("name", playerName);
    elements.$playerNameTitle.textContent = `Olá, ${playerName} !`;
    elements.$modalPlayerName.style.display = "none";
    elements.$modalStartLevel.style.display = "flex";
});

elements.$easy.addEventListener("click", () => {
    startGame("easy");
    localStorage.setItem("level", "easy");
    elements.$overlay.classList.add("displayNone");
});

elements.$medium.addEventListener("click", () => {
    startGame("medium");
    localStorage.setItem("level", "medium");
    elements.$overlay.classList.add("displayNone");
});

elements.$difficult.addEventListener("click", () => {
    localStorage.setItem("level", "difficult");
    startGame("difficult");
    elements.$overlay.classList.add("displayNone");
});
