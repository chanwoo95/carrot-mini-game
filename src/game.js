
import Field from './field.js';
import * as sound from './sound.js';


export default class Game {
    constructor(gameDuration ,carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameScore = document.querySelector('.game__score');
        this.gameTimer = document.querySelector('.game__timer');
        this.playBtn = document.querySelector('.game__button');
        this.playBtn.addEventListener('click', () => {
            if(this.started) {
                this.stop();
            } else {
                this.start();
            }
        })

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }   

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    initGame() {
        this.score = 0;
        this.gameField.init();
        this.gameField.innerHTML = '';

    }

    start() {
        this.started = true;
        this.initGame();
        this.startTimer();
        this.showScoreAndTimer();
        this.updateScoreBoard();
        sound.backgroundSound();
    }

    stop() {
        this.started = false;
        this.stopGameTimer();
        this.hideStopButton();
        this.onGameStop && this.onGameStop('cancel');
        
    }

    finish(win) {
        this.started = false;
        this.stopGameTimer();
        if(win) {
            sound.playWin();
        }   
        this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
    }

    onItemClick = item => {
        if(item === 'carrot') {
            this.score++;
            this.updateScoreBoard();
            if( this.score === this.carrotCount) {
                this.finish(false);
        } else if( item === 'bug') {
                this.finish(true);
            }
        }
    }

    startTimer() {
        let remainSec = this.gameDuration;
        this.updateTimer(remainSec);
        this.onGameStoptimer = setInterval(() => {
            if(remainSec < 0) {
                clearInterval(this.timer);
                this.finish(false);
                return;
            }
            this.updateTimer(--remainSec);
        }, 1000);
    }

    updateTimer(time) {
        const minutes = Math.floor( time / 60);
        const seconds = time % 60;
        this.gameTimer.innerHTML = `${minutes} : ${seconds}`;
    }

    showStopButton() {
        const icon = document.querySelector('.fas');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-stop');
    }

    hideStopButton() {
        this.playBtn.style.visibility = 'hidden';
    }
    

    stopGameTimer() {
    clearInterval(this.timer);
    }


    updateScoreBoard() {
    this.gameScore.innerHTML = this.carrotCount - this.score;
    }

    showScoreAndTimer() {
    this.gameScore.style.visibility = 'visible';
    this.gameTimer.style.visibility = 'visible';
    }

            

}