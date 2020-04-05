import {Game} from './engine/game.js';
import {Component} from './engine/component.js';
import {Layer} from './engine/layer.js';

//Funkce init slouzi pro tvorbu hry
const init = () => {
        let blue = new Component({
                name : "BLUE_COMPONENT",
                x: 'CW/2-200',
                y: 'CH/2',
                w: '200',
                h: '50',
                object: 'ellipse',
                color: 'blue',
                dragAndDrop: true
        });
        let red = new Component({
                name : "RED_COMPONENT",
                x: 'CW/2-100',
                y: 'CH/2+100',
                w: '300',
                h: '300',
                object: 'rect',
                color: 'red',
                dragAndDrop: false
        });

        //takhle si muzeme nadefinovat metody onClick, onMouseOver, onMouseOut a dragAndDrop
        red.onMouseOver(() =>{
                console.log("mys pres");
        });


        let down = new Layer('DOLNI_VRSTVA');
        let upper = new Layer('HORNI_VRSTVA');

        game.addLayer(down);
        game.addLayer(upper);

        down.addComponent(blue);
        upper.addComponent(red);

        
}


//v pripade ze je width a height hodnota full, pak bude na celou stranku a bude se automaticky menit velikost pri zmene velikosti obrazovky
//jdou take nastavit cisla vyjadrujici pixely
const gameConfig = {
        width: 'full',
        height: 'full',
        canvas: 'game'
}
const game = new Game(gameConfig);
//naslouchac na spousteci tlacitko
document.getElementById("init").addEventListener('click' , ()=>{
        document.getElementById("modal").style.display = "none";
        init();    
});
