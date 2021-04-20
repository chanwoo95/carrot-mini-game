'use strict';

import PopUp from './popup.js';
import * as sound from './sound.js';

const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_SEC = 15;

const CARROT_SIZE = 80;

const gameField = document.querySelector('.game__field');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');
const playBtn = document.querySelector('.game__button');
const field = gameField.getBoundingClientRect();


let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();


playBtn.addEventListener('click', () => {
      if(started) {
       stopGame(); 
    } else {
        startGame();
    }
});

gameField.addEventListener('click', onClickField);


function startGame() {
    started = true;
    initGame();
    startTimer();
    showScoreAndTimer();
    updateScoreBoard();
    sound.backgroundSound();
}




function stopGame() {
    started = false;
    stopGameTimer();
    gameFinishBanner.showWithText('Replay?');
}

function finishGame(win) {
    started = false;
    stopGameTimer();
    gameFinishBanner.showWithText(win ? 'You WIN!!!' : 'You LOST...')
}

function stopGameTimer() {
    clearInterval(timer);
}

function startTimer() {
    let remainSec = GAME_SEC;
    updateTimer(remainSec);
    timer = setInterval( () => {
        if(remainSec < 0) {
            clearInterval(timer);
            finishGame(false);
            return;
        }
        updateTimer(--remainSec);
    }, 1000)
}

function updateTimer(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes}:${seconds}`
}

function onClickField(event) {
    const target = event.target;
    if(target.matches('.carrot')) {
        target.remove();
        score++;
        updateScoreBoard();
        if(score === CARROT_COUNT) {
            finishGame(false);
        }
    } else if (target.matches('.bug')) {
        finishGame(false);
    }
}

function updateScoreBoard() {
    gameScore.innerHTML = CARROT_COUNT - score;
}

function showScoreAndTimer() {
    gameScore.style.visibility = 'visible';
    gameTimer.style.visibility = 'visible';
}

function addItem(className, imgPath, count) {

    const x1 = 0;
    const y1 = 0;
    const x2 = field.width - CARROT_SIZE;
    const y2 = field.height- CARROT_SIZE;

    for(let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position='absolute';
        const x = randomNum(x1,x2);
        const y = randomNum(y1,y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        gameField.appendChild(item);
    }
}

function randomNum(min, max) {
    return Math.random() * (max-min) + min;
}

function initGame() {
    score = 0;
    gameField.innerText = '';
    addItem('carrot', 'img/carrot.png', CARROT_COUNT);
    addItem('bug', 'img/bug.png', BUG_COUNT);
}
