
import Field from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win : 'win',
    lose : 'lose',
    cancle : 'cancle',
})

export const ItemType = Object.freeze({
    carrot : 'carrot',
    bug : 'bug',
})

export class GameBuilder {
    withGameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    withCarrotCount(countNum) {
        this.carrotCount = countNum;
        return this;
    }

    withBugCount(countNum) {
        this.bugCount = countNum;
        return this;
    }

    build() {
        return new Game(
          this.gameDuration,
          this.carrotCount,
          this.bugCount
        );
        
    }
}


class Game {
    constructor(gameDuration ,carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameScore = document.querySelector('.game__score');
        this.gameTimer = document.querySelector('.game__timer');
        this.playBtn = document.querySelector('.game__button');
        this.playBtn.addEventListener('click', () => {
            if(this.started) {
                this.stop(Reason.cancle);
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
        this.showStopButton();
        this.showScoreAndTimer();
        this.updateScoreBoard();
        sound.backgroundSound();
    }

    stop(reason) {
        this.started = false;
        this.stopGameTimer();
        this.hideStopButton();
        this.onGameStop && this.onGameStop(reason)
        
    }


    onItemClick = item => {
        if(item === ItemType.carrot) {
            this.score++;
            this.updateScoreBoard();
            sound.playCarrot();
            
            if( this.score === this.carrotCount) {
                this.stop(Reason.win);
            } 
        }
        else if( item === ItemType.bug) {
                this.stop(Reason.lose);
                
        }
    }

    startTimer() {
        let remainSec = this.gameDuration;
        this.updateTimer(remainSec);
        this.timer = setInterval(() => {
            if(remainSec <= 0) {
                clearInterval(this.timer);
                this.stop(Reason.lose);
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