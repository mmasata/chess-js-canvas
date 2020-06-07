import {Game} from './engine/game.js';
import { Chessboard } from './chessImpl/chessboard.js';
import {Player} from './chessImpl/player.js';

//Funkce init slouzi pro tvorbu hry
const init = () => {

        //pridani dvou hracu
        let players = [
                new Player("1"),
                new Player("2")
        ];

        //inicializace sachovnice
        const chessboardLayer  = new Chessboard('Chessboard_layer', true, game, players);
        game.addLayer(chessboardLayer);
        game.addLayer(chessboardLayer.chessmanLayer);


        //menu
        document.getElementById("mainMenu").style.display = 'none';
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
document.addEventListener('keydown', (evt)=>{
        evt = evt || window.event;
        if (evt.keyCode == 27) {
                let menu = document.getElementById("mainMenu");
                let menuVisibility = menu.style.display;
                menu.style.display = (menuVisibility === 'none') ? 'block' : 'none';
        }
});
document.getElementById("new-game").addEventListener('click' , ()=>{
        game.removeLayerByName('Chessboard_layer');
        game.removeLayerByName('Chessman_Layer');
        init();
});
