const gameBtn = document.querySelector('.game__button');
const playBtn = document.querySelector('.fa-play');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');
const gameField = document.querySelector('.game__field');

const CARROT_COUNT = 5;
const BUG_COUNT = 5;


function showStopBtn() {
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-stop');
}

function showStartBtn() {
    playBtn.classList.remove('fa-stop');
    playBtn.classList.add('fa-play');
    
}



function startGame() {
    gameBtn.addEventListener("click", () => {
        showStopBtn();
    });
}

function paintField(path, count) {
    
}

function init() {
    startGame();
    paintField('img/carrot.png', CARROT_COUNT);
    paintField('img/bug.png', BUG_COUNT);
}

init();
