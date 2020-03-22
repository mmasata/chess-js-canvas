import { Chessboard } from "./chessboard.js";

export class Game {
        
        constructor(){
                //hra si vytvori sachovnici
                this.chessboard = new Chessboard();
        }

        //metoda vyvolana pri zmene velikosti canvasu, aby se znovu prekreslila sachovnice ve spravne velikosti
        resizeChessBoard(){
                this.chessboard.initChessboard();
        }
}