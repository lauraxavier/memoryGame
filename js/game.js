import { shuffle } from "./utils.js";
import { cheap } from "./cards.js";
import * as elements from "./elements.js";

const flipped = [];
let score = 0;
let minute = 0;
let second = 0;
let endTime = false;
let cron;

const levelSettings = {
    easy: { minute: 2, second: 0 },
    medium: { minute: 1, second: 30 },
    difficult: { minute: 1, second: 0 },
};

elements.$playPauseButton.addEventListener("click", function () {
    if (elements.$audio.paused) {
        elements.$audio.play();
        elements.$playPauseButton.classList.add("playing");
        elements.$playIcon.style.display = "none";
        elements.$pauseIcon.style.display = "inline";
    } else {
        elements.$audio.pause();
        elements.$playPauseButton.classList.remove("playing");
        elements.$playIcon.style.display = "inline";
        elements.$pauseIcon.style.display = "none";
    }
});

export const startGame = (level) => {
    clearInterval(cron);
    const settings = levelSettings[level];
    if (settings) {
        minute = settings.minute;
        second = settings.second;
    }

    elements.$audio.currentTime = 0;
    elements.$audio.play();

    elements.$score.textContent = `Pontos: ${score}`;

    const stop = () => {
        clearInterval(cron);
    };

    cron = setInterval(() => {
        second -= 1;
        if (second === -1) {
            minute -= 1;
            second = 59;
        }
        let formattedSecond = second < 10 ? `0${second}` : second;
        let formattedMinute = minute < 10 ? `0${minute}` : minute;
        elements.$timer.textContent = `Tempo: ${formattedMinute} : ${formattedSecond}`;

        if (minute === 0 && second === 0) {
            stop();
            endTime = true;
            endGame();
        }
    }, 1000);

    shuffle(cheap).forEach((item) => {
        const $card = document.createElement("div");
        $card.classList.add("card");

        const $cardInner = document.createElement("div");
        $cardInner.classList.add("card-inner");

        const $cardFront = document.createElement("div");
        $cardFront.classList.add("card-front");

        const $cardBack = document.createElement("div");
        $cardBack.classList.add("card-back");

        const $imgFront = document.createElement("img");
        $imgFront.src = item.image;
        $imgFront.alt = item.name;
        $imgFront.classList.add("card-item");

        const $imgBack = document.createElement("img");
        $imgBack.src = item.backImage;
        $imgBack.alt = item.name;
        $imgBack.classList.add("card-item");

        $cardFront.appendChild($imgBack);
        $cardBack.appendChild($imgFront);

        $cardInner.appendChild($cardFront);
        $cardInner.appendChild($cardBack);

        $card.appendChild($cardInner);

        elements.$cardContainer.appendChild($card);

        $card.addEventListener("click", function (e) {
            if (item.flip) {
                return;
            }
            if (flipped.length < 2) {
                flipped.push({ $cardInner, item });
                $card.classList.add("is-flipped");
                item.flip = true;
                elements.$flopSound.play();
                if (flipped.length === 2) {
                    checkMatch();
                    elements.$score.textContent = `Pontos: ${score}`;
                }
            }
        });
    });
};

const checkMatch = () => {
    const firstCard = flipped[0];
    const secondCard = flipped[1];
    if (firstCard.item.name === secondCard.item.name) {
        score += 10;
        elements.$successSound.play();
        flipped.length = 0;
    } else {
        setTimeout(() => {
            firstCard.$cardInner.parentElement.classList.remove("is-flipped");
            secondCard.$cardInner.parentElement.classList.remove("is-flipped");
            elements.$flipSound.play();
            firstCard.item.flip = false;
            secondCard.item.flip = false;
            flipped.length = 0;
        }, 1000);
    }
    endGame();
};

const resetGame = () => {
    clearInterval(cron);
    score = 0;
    minute = 0;
    second = 0;
    endTime = false;
    flipped.length = 0;

    elements.$cardContainer.innerHTML = "";

    elements.$score.textContent = `Pontos: ${score}`;
    elements.$timer.textContent = `Tempo: 00 : 00`;

    elements.$audio.currentTime = 0;
    elements.$audio.play();

    elements.$modalEndGame.style.display = "none";
    elements.$overlay.style.display = "none";
};

const endGame = () => {
    const allFlipped = cheap.every((item) => item.flip === true);

    if (allFlipped || endTime) {
        stop();
        elements.$audio.pause();
        elements.$overlay.style.display = "flex";
        elements.$modalEndGame.style.display = "flex";
        elements.$modalStartLevel.style.display = "none";

        const level = localStorage.getItem("level");

        elements.$playAgain.addEventListener("click", function () {
            resetGame();
            startGame(level);
        });

        elements.$changePlayer.addEventListener("click", function () {
            localStorage.clear();
            location.reload();
        });

        if (score <= 50) {
            elements.$loseSound.play();
            elements.$endGameTitle.textContent = `Xiii, precisa treinar mais! Você fez ${score} pontos`;
            elements.$endImg.src = "assets/img/brainLose.png";
            elements.$saveRecord.style.display = "none";
        }
        if (score > 50 && !allFlipped) {
            elements.$loseSound.play();
            elements.$endGameTitle.textContent = `Foi quase! Tente outra vez! Você fez ${score} pontos`;
            elements.$endImg.src = "assets/img/brainAlmost.png";
            elements.$saveRecord.style.display = "block";
        }
        if (allFlipped) {
            elements.$winSound.play();
            elements.$endGameTitle.textContent = `Uauu, você é incrível! Você fez ${score} pontos`;
            elements.$endImg.src = "assets/img/brainWin.png";
            elements.$saveRecord.style.display = "block";
        }
    }
};
