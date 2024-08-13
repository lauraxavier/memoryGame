import * as elements from "./elements.js";

let cron = null;
export let endTime = false;

export const startTime = (initialMinute, initialSecond, endGameCallback) => {
    let minute = initialMinute;
    let second = initialSecond;
    endTime = false;

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
            endGameCallback();
        }
    }, 1000);
};

export const stop = () => {
    clearInterval(cron);
};
