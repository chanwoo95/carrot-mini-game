const gameBtn = document.querySelector('.game__button');
const playBtn = document.querySelector('.fa-play');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');
const gameField = document.querySelector('.game__field');
const fieldRect = gameField.getBoundingClientRect();

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

function addItem(className, imgPath, count) {
   
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width;
    const y2 = fieldRect.height; 
    
    for(let i=0; i<count; i++){
        const item = document.createElement('img');
        item.setAttribute('className', className);
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
    startGame();
    addItem('carrot', 'img/carrot.png', CARROT_COUNT);
    addItem('bug', 'img/bug.png', BUG_COUNT);
}

init();
