const gameBtn = document.querySelector('.game__button');
const playBtn = document.querySelector('.fa-play');

const replayBtn = document.querySelector('.replay__button');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');
const gameField = document.querySelector('.game__field');
const popUpMessage = document.querySelector('.popUp__message');
const fieldRect = gameField.getBoundingClientRect();

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const CARROT_SIZE = 80;
const GAME_SEC = 10;

let started = false;


gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
    } else {
        startGame();
        started = !started;
    }
})

gameField.addEventListener('click', (event) => {
    const target = event.target;
    if(target.matches('.carrot')) {
        gameField.removeChild(event.target);
    } else if(target.matches('.bug')) {
        stopGame();
    }
})





function startGame() {
    showStopBtn();
    startTimer();
}

function stopGame() {
    showPopupMessage();
    stopGameTimer();
}

function startTimer() {
    let remainSec = GAME_SEC;
    updateTextTimer(remainSec);
    gameTimer = setInterval( ()=> {
        if(remainSec <= 0) {
            clearInterval(gameTimer);
            return;
        }
        updateTextTimer(--remainSec);
        
        
    }, 1000)
}

function updateTextTimer(time) {
    gameTimer.textContent=time;
}

function stopGameTimer() {
    gameTimer.clearInterval();
}



function showStopBtn() {
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-stop');
}

function showPopupMessage() {
    popUpMessage.style.visibility = 'visible';
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
    gameField.innerHTML = "";
    addItem('carrot', 'img/carrot.png', CARROT_COUNT);
    addItem('bug', 'img/bug.png', BUG_COUNT);
}
init();
