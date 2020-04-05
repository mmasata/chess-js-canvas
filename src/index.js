import {Game} from './engine/game.js';
import {Component} from './engine/component.js';
import {Layer} from './engine/layer.js';
import {ComponentConnector} from './engine/componentConnector.js';
import { Chessboard } from './chessImpl/chessboard.js';

//Funkce init slouzi pro tvorbu hry
const init = () => {
        const chessboard = new Chessboard(game);
        const chessboardLayer  = new Layer('Chessboard_layer', true);
        chessboardLayer.addComponents(chessboard.getSquares());
        game.setOffscreenLayer(chessboardLayer);

        
        let blue = new Component({
                name : "BLUE_COMPONENT",
                x: 'CW/2-200',
                y: 'CH/2',
                w: '100',
                h: '100',
                object: 'rect',
                color: 'blue',
                dragAndDrop: true
        });
        const chessmanLayer = new Layer("Chessman_Layer" , false);
        chessmanLayer.addComponent(blue);
        game.addLayer(chessmanLayer);
        
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
