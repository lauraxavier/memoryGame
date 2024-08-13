import * as elements from "./elements.js";

export const musicControls = () => {
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
};
