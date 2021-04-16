const gameBtn = document.querySelector('.game__button');
const playBtn = document.querySelector('.fa-play');

const replayBtn = document.querySelector('.replay__button');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');
const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();

const popUpMessage = document.querySelector('.popUp__message');
const popUpBtn = document.querySelector('.popUp__button');
const popUpText = document.querySelector('.popUp__text');


const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const CARROT_SIZE = 80;
const GAME_SEC = 10;

let started = false;
let score = 0;


gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
    } else {
        startGame();
    }
})

gameField.addEventListener('click', onFieldClick)

popUpBtn.addEventListener('click', () => {
    startGame();
    hidePopUpMessage();
})

function onFieldClick(event) {
    const target = event.target;
    if(target.matches('.carrot')) {
        target.remove();
        score++;
        updateScoreBoard();
        if(CARROT_COUNT === score) {
            finishGame();
        }
    } else if (target.matches('.bug')) {
        finishGame();
    }
}

function finishGame() {
    started = true; 
    showPopupWithText(win ? 'You LOSE😂' : 'You WIN!!!!🥰');
    stopGameTimer();
}


function updateScoreBoard() {
    gameScore.innerHTML = CARROT_COUNT - score;
}


function startGame() {
    started = false;
    init(); 
    showStopButton();
    showTimerAndScore(); 
    startGameTimer(); 
    updateScoreBoard(); 
}

function stopGame() {
    started = true;
    showPopupWithText("Replay?😋");
    stopGameTimer();
    hideGameButton();
}

function hidePopUpMessage() {
    popUpMessage.style.visibility = 'hidden';
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameScore.style.visibility = 'visible';
    gameTimer.style.visibility = 'visible';

}

function startGameTimer() {
    let remainSec = GAME_SEC;
    updateTextTimer(remainSec);
    timer = setInterval( ()=> {
        if(remainSec <= 0) {
            clearInterval(timer);
            stopGame();
            return;
        }
        updateTextTimer(--remainSec);
        
        
    }, 1000)
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTextTimer(time) {
    gameTimer.textContent=time;
}



function showStopButton() {
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-stop');
}

function showPopupWithText(text) {
    popUpMessage.style.visibility = 'visible';
    popUpText.textContent = text;
    popUpMessage.classList.remove('pop-up--hide');
}





function addItem(className, imgPath, count) {
   
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width-CARROT_SIZE;
    const y2 = fieldRect.height-CARROT_SIZE; 
    
    for(let i=0; i<count; i++){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position='absolute';

        const x = randomNum(x1,x2);
        const y = randomNum(y1,y2);
        item.style.left=`${x}px`;
        item.style.top=`${y}px`;
        gameField.appendChild(item);
    }
}

function randomNum(min,max) {
    return Math.random() * (max - min) + min;
}

function init() {
    gameField.innerHTML = '';
    addItem('carrot', 'img/carrot.png', CARROT_COUNT);
    addItem('bug', 'img/bug.png', BUG_COUNT);

}
