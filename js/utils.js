export function shuffle(cards) {
    function randOrd() {
        return Math.round(Math.random()) - 0.5;
    }
    return cards.sort(randOrd);
}

export function getLevel() {
    return localStorage.getItem("level");
}

export function getPlayerName() {
    return localStorage.getItem("name");
}
