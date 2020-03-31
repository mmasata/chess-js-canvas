import {Game} from './engine/game.js';
import {Component} from './engine/abstractComponent.js';
import { Layer } from './engine/layer.js';

//v pripade ze je width a height hodnota full, pak bude na celou stranku a bude se automaticky menit velikost pri zmene velikosti obrazovky
//jdou take nastavit cisla vyjadrujici pixely
const gameConfig = {
        width: 'full',
        height: 'full',
        canvas: 'game'
}

const game = new Game(gameConfig);

const init = () => {
        document.getElementById("modal").style.display = "none";

        //zde nastavujeme jiz hru
        //TODO
        let blue = new MyComponent2({
                name : "BLUE_COMPONENT",
                x: 'CW/2-200',
                y: 'CH/2',
                w: '200',
                h: '200',
                object: 'ellipse',
                color: 'blue',
                dragAndDrop: true
        });
        let red = new MyComponent({
                name : "RED_COMPONENT",
                x: 'CW/2-100',
                y: 'CH/2+100',
                w: '300',
                h: '300',
                object: 'rect',
                color: 'red',
                dragAndDrop: false
        });
        let down = new Layer('DOLNI_VRSTVA');
        let upper = new Layer('HORNI_VRSTVA');

        game.addLayer(down);
        game.addLayer(upper);

        down.addComponent(blue);
        upper.addComponent(red);

        
}

//naslouchac na spousteci tlacitko
document.getElementById("init").addEventListener('click' , init);


class MyComponent extends Component {

        constructor(config){
                super(config);
        }

        onClick(){
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        }
}

class MyComponent2 extends Component {

        constructor(config){
                super(config);
        }
}