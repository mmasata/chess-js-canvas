import {Game} from './engine/game.js';
import { Chessboard } from './chessImpl/chessboard.js';
import {Player} from './chessImpl/player.js';

//Funkce init slouzi pro tvorbu hry
const init = () => {

        //pridani dvou hracu
        let players = [
                new Player("BOB"),
                new Player("TOM")
        ];

        //inicializace sachovnice
        const chessboardLayer  = new Chessboard('Chessboard_layer', true, game, players);
        game.addLayer(chessboardLayer);
        game.addLayer(chessboardLayer.chessmanLayer);
}


//v pripade ze je width a height hodnota full, pak bude na celou stranku a bude se automaticky menit velikost pri zmene velikosti obrazovky
//jdou take nastavit cisla vyjadrujici pixely
const gameConfig = {
        width: '1000',
        height: '1000',
        canvas: 'game'
}
const game = new Game(gameConfig);
//naslouchac na spousteci tlacitko
document.getElementById("init").addEventListener('click' , ()=>{
        document.getElementById("modal").style.display = "none";
        init();    
});
