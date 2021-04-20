'use strict';

export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpBtn = document.querySelector('.pop-up--button');
        this.popUpText = document.querySelector('.pop-up--text');
        this.onClick && this.setClickListener('click', onClick);
    
    }

    setClickListener(onClick) {
        this.onClick = onClick();
    }

    

    hide() {
        this.popUp.classList.add('pop-up--hide');
    }

    showWithText(text) {
        this.popUpText.textContent = text;
        this.popUp.classList.remove('pop-up--hide');

    }
}
