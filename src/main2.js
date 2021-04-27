'use strict';

import Game from './game.js';
import PopUp from './popup.js';


const gameFinishBanner = new PopUp();

const game = new Game(15, 5, 5);
game.setGameStopListener(state => {
    
    let message;
    switch(state) {
        case 'cancel':
            message = 'REPLAY?';
            break;
        case 'win' :
            message = 'YOU WIN!!!';
            break;
        case 'lose' :
            message = 'YOU LOST...'
            break;
        default :
            throw new Error('error!');
        }
    gameFinishBanner.showWithText(message);
    });
            
    gameFinishBanner.setClickListener(() => {
      game.start();    
    })
            

