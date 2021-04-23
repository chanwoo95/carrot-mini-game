

export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpMessage = document.querySelector('.pop-up__message');
        this.popUpRefreshBtn = document.querySelector('.pop-up__refresh');
        this.popUpRefreshBtn.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }
    

    hide() {
        this.popUp.classList.add('hide');
    }

    showWithText(text) {
        this.popUpMessage.textContent = text;
        this.popUp.classList.remove('hide');
    }
}


