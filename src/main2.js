'use strict';

import { GameBuilder, Reason } from './game.js';
import PopUp from './popup.js';
import * as sound from "./sound.js";





const gameFinishBanner = new PopUp();

const game = new GameBuilder()
.withGameDuration(15)
.withCarrotCount(5)
.withBugCount(8)
.build()


game.setGameStopListener(reason => {
    let message;
    switch(reason) {
        case Reason.cancle:
            message = 'REPLAY?';
            sound.playAlert();
            sound.stopBackground();
            break;
        case Reason.win :
            message = 'YOU WIN!!!';
            sound.playWin();
            sound.stopBackground();

            break;
        case Reason.lose :
            message = 'YOU LOST...'
            sound.playBug();
            sound.stopBackground();
            break;
        default :
            throw new Error('error!');
        }
    gameFinishBanner.showWithText(message);
    });
            
    gameFinishBanner.setClickListener(() => {
      game.start();    
    })
            

