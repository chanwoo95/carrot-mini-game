'use strict';

export default class PopUp {
    constructor() {
        this.popUpMessage = document.querySelector('.popUp__message');
        this.popUpText = document.querySelector('.popUp__text');
        this.popUpBtn = document.querySelector('.popUp__button');
        this.popUpBtn.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
            
        })
    }

        setClickListener(onClick) {
            this.onClick = onClick;
        }

        showWithText(text) {
            this.popUpText.innerText = text;
            this.popUpMessage.classList.remove('pop-up--hide');
        }

        hide() {
            this.popUpMessage.classList.add("pop-up--hide");
            
        }


}

    
