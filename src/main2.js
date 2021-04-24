'use strict';

import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_SEC = 15;

const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');
const playBtn = document.querySelector('.game__button');


let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
    if(!started) {
        return;
    }
    if(item === 'carrot') {
    score++;
    updateScoreBoard();
    if( score === CARROT_COUNT ) {
        finishGame(true);
    }
        
       finishGame(true);
    } else if (item === 'bug') {
        finishGame(false);
    }
}


gameFinishBanner.setClickListener(() => {
    startGame();
})



playBtn.addEventListener('click', () => {
      if(started) {
       stopGame(); 
    } else {
        startGame();
    }
});


function startGame() {
    started = true;
    gameField.init();
    startTimer();
    showScoreAndTimer();
    showStopButton();
    updateScoreBoard();
    sound.backgroundSound();
}


function stopGame() {
    started = false;
    stopGameTimer();
    hideStopButton();
    gameFinishBanner.showWithText('Replay?');
}

function finishGame(win) {
    started = false;
    stopGameTimer();
    gameFinishBanner.showWithText(win ? 'You WIN!!!' : 'You LOST...')
    if(win) {
        sound.playWin();
    } 
}



function startTimer() {
  let remainSec = GAME_SEC;
  updateTimer(remainSec);
  timer = setInterval(() => {
    if (remainSec < 0) {
      clearInterval(timer);
      finishGame(false);
      return;
    }
    updateTimer(--remainSec);
  }, 1000);
}

function updateTimer(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerHTML = `${minutes}:${seconds}`;
}


function showStopButton() {
    const icon = document.querySelector('.fas');
    icon.classList.remove('fa-play');
    icon.classList.add('fa-stop');
}

function hideStopButton() {
    playBtn.style.visibility = 'hidden';
}



function stopGameTimer() {
    clearInterval(timer);
}



function updateScoreBoard() {
    gameScore.innerHTML = CARROT_COUNT - score;
}

function showScoreAndTimer() {
    gameScore.style.visibility = 'visible';
    gameTimer.style.visibility = 'visible';
}

