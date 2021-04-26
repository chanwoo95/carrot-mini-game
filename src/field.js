const CARROT_SIZE = 80;

export default class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick);
    }
    
    
    
    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }
    
    onClick = (event) => {
        const target = event.target;
        
        if(target.matches('.carrot')) {
            target.remove();
            this.onItemClick && this.onItemClick('carrot');
        } else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick('bug');
        }
        
        
    }

    init() {
        this.field.innerHTML = '';
        this._addItem('carrot', 'img/carrot.png', this.carrotCount);
        this._addItem('bug', 'img/bug.png', this.bugCount);
    }

    _addItem(className, imgPath, count) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE; 
        const y2 = this.fieldRect.height - CARROT_SIZE;

        for(let i =0 ; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            
            const x = randomNum(x1,x2);
            const y = randomNum(y1,y2);

            item.style.position = 'absolute';
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

}

function randomNum(min, max) {
    return Math.random() * (max - min) + min

    
}