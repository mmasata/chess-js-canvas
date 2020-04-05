import {Game} from './engine/game.js';
import {Layer} from './engine/layer.js';
import {King} from './chessImpl/chessman.js';
import {ComponentConnector} from './engine/componentConnector.js';
import { Chessboard } from './chessImpl/chessboard.js';

//Funkce init slouzi pro tvorbu hry
const init = () => {

        //inicializace sachovnice
        const chessboard = new Chessboard(game);
        const chessboardLayer  = new Layer('Chessboard_layer', true);
        chessboardLayer.addComponents(chessboard.getSquares());
        game.setOffscreenLayer(chessboardLayer);


        //inicializace figurek
        let chessmans = chessboard.getChessmans();
        const chessmanLayer = new Layer("Chessman_Layer" , false);
        chessmanLayer.addComponents(chessmans);
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
