const bgSound = new Audio('./sound/bg.mp3');
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio('./sound/alert.wav');

export function backgroundSound() {
    playSound(bgSound);
}

export function playCarrot() {
    playSound(carrotSound);
}

export function playAlert() {
    playSound(alertSound);
}


export function playBug() {
    playSound(bugSound);
}

export function playWin() {
    playSound(winSound);
}

export function stopBackground() {
    stopSound(bgSound);
}

function stopSound(sound) {
    sound.pause();
}


function playSound(sound) {
    sound.play();
}


