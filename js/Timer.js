export class Timer {
    constructor(onEnd, onUpdate) {
        this.cron = null;
        this.onEnd = onEnd;
        this.onUpdate = onUpdate;
        this.minute = 0;
        this.second = 0;
    }

    start(minute, second) {
        this.minute = minute;
        this.second = second;

        this.cron = setInterval(() => {
            this.second -= 1;
            if (this.second === -1) {
                this.minute -= 1;
                this.second = 59;
            }

            let formattedSecond =
                this.second < 10 ? `0${this.second}` : this.second;
            let formattedMinute =
                this.minute < 10 ? `0${this.minute}` : this.minute;

            if (this.onUpdate) {
                this.onUpdate(`${formattedMinute} : ${formattedSecond}`);
            }

            if (this.minute === 0 && this.second === 0) {
                this.reset();
                this.onEnd();
            }
        }, 1000);
    }

    reset() {
        clearInterval(this.cron);
    }
}
