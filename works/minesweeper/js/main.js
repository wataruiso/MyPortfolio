'use strict';


class Panel {
    constructor(game, board) {
        this.board = board;
        this.game = game;
        this.isMarked = undefined;
        this.index = undefined;
        this.counter = 0;
        this.minedNumber = 0;
        this.result = document.getElementById('result');
        this.blackcover = document.getElementById('blackcover');
        this.modal = document.getElementById('modal');
        this.el = document.createElement('li');
        this.el.classList.add('panel');
        this.el.addEventListener('click', () => {
            if(this.game.getMarking() && !this.el.classList.contains('mined')) {
                this.el.classList.toggle('marking');
                return;
            }
            if(this.el.classList.contains('marking')) {
                return;
            }
            if(this.el.classList.contains('mined')) {
                return;
            }
            this.check();
            if(this.minedNumber.length === this.game.getVolume() - this.game.getMine()){
                this.blackcover.style.display = 'block';
                setTimeout(() => {
                this.el.classList.add('complete');
                this.modal.classList.add('shown');
                this.result.textContent = 'GAME CLEAR!';
            }, 500);
            }
        })
    }
   getEl() {
       return this.el;
   } 
   check() {
       const replay = document.getElementById('replay');
     if(this.el.classList.contains('bomb')){
         this.el.classList.add('explode');
         this.blackcover.style.display = 'block';
         setTimeout(() => {
            this.el.classList.remove('explode');
            this.el.classList.add('afterexplode');
            this.modal.classList.add('shown');
            this.result.textContent = 'GAME OVER';
        }, 1000);
     }else {
        this.checkSafe();
     }
     replay.addEventListener('click', () => {
         blackcover.style.display = 'none';
         modal.classList.remove('shown');
         this.game.setup();
     })
   }
   activate(item, index) {
        this.reset();
        this.el.classList.add(item);
        this.index = index;
        if(this.index % Math.sqrt(this.game.getVolume()) === 0) {
            this.el.classList.add('l');
        }
        if(this.index % Math.sqrt(this.game.getVolume()) === this.getRtNumber()) {
            this.el.classList.add('r');
        }
        if(this.index >= 0 && this.index <= this.getRtNumber()){
            this.el.classList.add('t');
        }
        if(this.index >= this.getLbNumber() && this.index <= this.getRbNumber()){
            this.el.classList.add('b');
        }
   }
   checkSafe() {
        let aroundPanels = {lt: this.index - this.getRtNumber() - 2, 
                               t: this.index - this.getRtNumber() - 1, 
                              rt: this.index - this.getRtNumber(), 
                               l: this.index - 1, 
                               r: this.index + 1, 
                              lb: this.index + this.getRtNumber(), 
                               b: this.index + this.getRtNumber() + 1, 
                              rb: this.index + this.getRtNumber() + 2,
                            };
        
        Object.entries(aroundPanels).forEach(aroundPanel => {
            for(let i = 2; i < 4; i++) {
                if(aroundPanel[0].indexOf(this.el.classList[i]) !== -1) {
                  return;
                };
            }
            this.countUp(aroundPanel);
        })

        if(this.counter === 0) {
            Object.entries(aroundPanels).forEach(aroundPanel => {
                this.aroundClick(aroundPanel);
            });
        }else {
            this.el.textContent = this.counter;
        }

        this.el.classList.add('mined');      
        this.minedNumber = this.board.getPanels().filter((value) => {
            return value.el.classList.contains('mined');
        });
        this.counter = 0;
   }

   countUp(aroundPanel) {
     if(this.board.getPanels()[aroundPanel[1]].el.classList.contains('bomb')) {
         this.counter++;
     }
   }

   aroundClick(aroundPanel) {
    for(let i = 2; i < 4; i++) {
        if(aroundPanel[0].indexOf(this.el.classList[i]) !== -1) {
          return;
        };
    }
     this.board.getPanels()[aroundPanel[1]].el.click();
   }


   getRtNumber(){
    return Math.sqrt(this.game.getVolume()) - 1;
   }
   getLbNumber(){
    return Math.sqrt(this.game.getVolume()) * (Math.sqrt(this.game.getVolume()) - 1);
    }
   getRbNumber(){
    return this.game.getVolume() - 1;
    }
    reset() {
        this.el.classList.remove('marking');
        this.el.classList.remove('bomb');
        this.el.classList.remove('safe');
        this.el.classList.remove('mined');
        this.el.classList.remove('afterexplode');
        this.el.textContent = '';
        this.minedNumber = 0;
    }
   
}

class Board {
    constructor(game) {
        this.game = game;
        this.panels = [];
        for(let i = 0; i < this.game.getVolume(); i++) {
        this.panels.push(new Panel(this.game, this));
        }
    }
    getPanels() {
        return this.panels;
    }
    setup() {
        const board = document.getElementById('board');
        board.style.display = 'grid';
        this.panels.forEach(panel => {
            board.appendChild(panel.getEl());
        })
    }
    activate() {
        const items = [];
        for(let i = 0;  i < this.game.getVolume() - this.game.getMine(); i++){
            items.push('safe');
            if(i < this.game.getMine()){
            items.push('bomb');
            }
        }
        this.panels.forEach((panel, index) => {
            const item = items.splice(Math.floor(Math.random() * items.length), 1)[0];
            panel.activate(item, index);
        });
    }
}

class Game {
   constructor(mine, volume) {
        this.mine = mine;
        this.volume = volume;
        this.board = new Board(this);
        this.marking = false;
        const title = document.getElementById('title');
        const btn = document.getElementById('btn');
        btn.addEventListener('click', () => {
            this.setup();
            btn.style.display = 'none';
            title.style.display = 'none';
            mark.style.display = 'block';
        });
        const mark = document.getElementById('mark');
            mark.addEventListener('click', () => {
            if(this.marking) {
                this.marking = false;
                mark.classList.remove('marking');
            }else {
                this.marking = true;
                mark.classList.add('marking');
            }
        });
   }
   getVolume() {
       return this.volume ** 2;
   }
   getMine() {
       return this.mine;
   }
   setup() {
       this.board.setup();
       this.board.activate();
   }
   getMarking() {
       return this.marking;
   }

}

new Game(20, 10);