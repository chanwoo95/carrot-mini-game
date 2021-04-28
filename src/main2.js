'use strict';

import GameBuilder from './game.js';
import PopUp from './popup.js';


const gameFinishBanner = new PopUp();

const game = new GameBuilder()
.withGameDuration(15)
.withCarrotCount(3)
.withBugCount(3)
.build()

game.setGameStopListener(state => {
    console.log(state);
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
            

