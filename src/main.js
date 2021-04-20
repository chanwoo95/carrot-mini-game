'use strict';

import PopUp from './popup.js';
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

const gameFinishBanner = new PopUp();

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

gameFinishBanner.setClickListener( () => {
    startGame();
});


function onFieldClick(event) {
    if(!started) {
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')) {
        target.remove();
        score++;
        updateScoreBoard();
        if(score === CARROT_COUNT) {
            finishGame(true);
            
        }
    } else if (target.matches('.bug')) {
        finishGame(false);
    }
}


function startGame() {
    started = true;
    init(); 
    showStopButton();
    showTimerAndScore(); 
    startGameTimer(); 
    
}

function stopGame() {
    started = false;
    gameFinishBanner.showWithText("Replay?😋");
    stopGameTimer();
    hideGameButton();
}

function finishGame(win) {
  started = false;
  gameFinishBanner.showWithText(win ? "You WIN!!!!🥰" : "You LOST😂");
  stopGameTimer();
}


function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
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
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTextTimer(--remainSec);
        
    }, 1000)
}

function stopGameTimer(timer) {
    clearInterval(timer);
}

function updateTextTimer(time) {
    gameTimer.textContent=time;
}



function showStopButton() {
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-stop');
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
    score = 0;
    gameField.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', 'img/carrot.png', CARROT_COUNT);
    addItem('bug', 'img/bug.png', BUG_COUNT);

}
