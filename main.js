const gameBtn = document.querySelector('.game__button');
const playBtn = document.querySelector('.fa-play');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');
const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const CARROT_SIZE = 80;

let started = false;

gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
    } else {
        startGame();
        started = !started;
    }
})

function startGame() {
    showStopBtn();
    showPopupMessage();
}


function showStopBtn() {
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-stop');
}

function showPopupMessage() {
    
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
    addItem('carrot', 'img/carrot.png', CARROT_COUNT);
    addItem('bug', 'img/bug.png', BUG_COUNT);
}

init();
