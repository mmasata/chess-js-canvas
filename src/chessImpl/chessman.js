//trida figurky, ze ktere budou dedit vsechny druhu figurek
//jednotlivi potomci budou mit jina pravidla pohybu
import {Component} from '../engine/component.js';

export class Chessman extends Component {

        constructor(config, layer, type){
                super(config);
                
                //layer sachovnice
                this.layer = layer;
                this.color = config.color;
                this.type = type;
                this.square = null;
                this.moves = [];
        }

        getColor() {
                return this.color;
        }
             
        getType() {
                return this.type;
        }

        _setFigureImage(imageName){
                let image = new Image();
                image.src = '../img/' + imageName + '.png';
                this.config.image = image;
        }

        getSquare(){
                return this.square;
        }

        setSquare(square){
                this.square = square;
        }

        //prevede pismeno na cislici kvuli sachovnici
        getNumberFromLetter(letter){
                let arr = ['' , 'A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H'];
                return arr.indexOf(letter);
        }

        //preve cislici na pismeno kvuli sachovnici
        getLetterFromNumber(number){
                let arr = ['' , 'A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H'];
                return arr[number];  
        }

        //vrati vsechny square name, na ktere muze figurka prejit
        getPossibleMoves(){}

        onMouseDown(){
                let moves = this.getPossibleMoves();
                if(moves){
                        for(let move of moves){
                                this.layer.makeSquareMoveVisible(move);
                        }
                        this.moves = moves;
                }
        }

        onMouseUp(){
                if(this.moves){
                        for(let move of this.moves){
                                this.layer.makeSquareMoveHidden(move);
                        }
                        //najde kam chtel hrac figurku presunout
                        let destinationSquare = null;
                        for(let move of this.moves){
                                let square = this.layer.getSquareByName(move);
                                let x = this.config.x + (this.config.w/2);
                                let y = this.config.y + (this.config.h/2);
                                if( (x>=square.config.x && x<=(square.config.x+square.config.w)) && (y>=square.config.y && y<=(square.config.y+square.config.h)) ){
                                        destinationSquare = square;
                                }
                        }
                        if(destinationSquare){
                                //TODO pokud je zde protihracova figurka, pak ji sejme
                                if(destinationSquare.getChessman() != null){
                                        this.destroyEnemyChessman(destinationSquare);
                                }

                                this.moveChessman(destinationSquare);

                                //ukonci tah hrace
                                this.endPlayerMove();
                        }
                        //chce ji pretahnout jinam, vratit na origin
                        else {
                                this.moveChessman(this.square);
                        }
                        //vycisti promennou
                        this.moves = [];
                }
        }

        //presune figurku na dany square
        moveChessman(square){
                this.config.x = square.config.x;
                this.config.y = square.config.y;

                this.square.setChessman(null);

                //musime rict i chessSquare, ze tam je
                square.setChessman(this);

        }


        //ukonci tah hrace
        endPlayerMove(){
                this.layer.switchPlayer();
        }

        //znici protihracovu figurku
        destroyEnemyChessman(square){
                //odstrani ji z chessman vrstvy
                this.layer.chessmanLayer.removeComponentObj(square.getChessman());

                //odstrani ji ze square
                square.setChessman(null);

                //odstrani ji z listu hrace
                //TODO
        }


}

//trida pesaka
export class Pawn extends Chessman {

        constructor (config, layer) {
                super(config, layer, 'Pawn');
                (config.color === 'black') ? this._setFigureImage('pawn_black') : this._setFigureImage('pawn_white');
        }

        //vrati vsechny square name, na ktere muze figurka prejit
        getPossibleMoves(){
                let availableMoves = [];
                let chessmanPosition = this.square.getConfig().name;
                let positionLetter = chessmanPosition.charAt(0);
                let positionNumber = Number(chessmanPosition.charAt(1));

                //kdyz je na zacatku muze o jedno nebo o dve
                let conditionStartNumber = (this.color === 'white') ? 7 : 2;
                let conditionStartOneStep= (this.color === 'white') ? positionNumber-1 : positionNumber+1;
                let conditionStartTwoStep= (this.color === 'white') ? positionNumber-2 : positionNumber+2;
                if(chessmanPosition.includes(conditionStartNumber)){
                        //kdyz je na [pismeno, 6] nejaka figurka, pak nemuze jit nikam
                        if(!this.layer.getSquareByName(positionLetter+conditionStartOneStep).hasChessman()){
                                availableMoves.push(positionLetter+ conditionStartOneStep);

                                //kdyz je na [pismeno, 5] nejaka figurka, pak nemuze jit na danou pozici
                                if(!this.layer.getSquareByName(positionLetter+conditionStartTwoStep).hasChessman()){
                                        availableMoves.push(positionLetter+ conditionStartTwoStep);
                                }
                        }
                }
                //kdyz je 2-6 pak muze o jedno dopredu (u bile) -1
                //kdyz je 3-7 pak muze o jednu dopredu (u cerne) +1
                else if(positionNumber > 1 && positionNumber < 8){
                        if(!this.layer.getSquareByName(positionLetter+conditionStartOneStep).hasChessman()){
                                availableMoves.push(positionLetter+conditionStartOneStep);  
                        }
                }
                else {
                //kdyz je na 1 nebo 8 muze menit za jinou figurku
                //TODO
                }

                //když je protihráč na [písmeno-1;číslo-1] nebo [písmeno+1;číslo-1] (u bile)
                // kdyz je prottihrac na [písmeno-1;číslo+1] nebo [písmeno+1;číslo+1] (u cerne)
                let letterNumber = this.getNumberFromLetter(positionLetter);
                if(letterNumber>1){
                        let letter = this.getLetterFromNumber(letterNumber-1);
                        //checkni jestli je nalevo nad protihrac
                        if(this.layer.getSquareByName(letter+conditionStartOneStep).hasChessman()){
                                if(this.layer.getSquareByName(letter+conditionStartOneStep).getChessman().getConfig().color != this.config.color){
                                        availableMoves.push(letter+conditionStartOneStep);
                                }
                        }
                }
                if(letterNumber<8){
                        let letter = this.getLetterFromNumber(letterNumber+1);
                        //checkni jestli je napravo nad protihrac
                        if(this.layer.getSquareByName(letter+conditionStartOneStep).hasChessman()){
                                if(this.layer.getSquareByName(letter+conditionStartOneStep).getChessman().getConfig().color != this.config.color){
                                        availableMoves.push(letter+conditionStartOneStep);
                                }
                        }
                }
                return availableMoves;
        }
}

//trida veze
export class Rook extends Chessman {

        constructor (config, layer) {
                super(config, layer, 'Rook');
                (config.color === 'black') ? this._setFigureImage('rook_black') : this._setFigureImage('rook_white');
        }
}

//trida jezdce
export class Knight extends Chessman {

        constructor (config, layer) {
                super(config, layer, 'Knight');
                (config.color === 'black') ? this._setFigureImage('knight_black') : this._setFigureImage('knight_white');
        }
}

//trida strelce
export class Bishop extends Chessman {

        constructor (config, layer) {
                super(config, layer, 'Bishop');
                (config.color === 'black') ? this._setFigureImage('bishop_black') : this._setFigureImage('bishop_white');
        }
}

//trida damy
export class Queen extends Chessman {

        constructor (config, layer) {
                super(config, layer, 'Queen');
                (config.color === 'black') ? this._setFigureImage('queen_black') : this._setFigureImage('queen_white');
        }
}

//trida krale
export class King extends Chessman {

        constructor (config, layer) {
                super(config, layer, 'King');
                (this.config.color === 'black') ? this._setFigureImage('king_black') : this._setFigureImage('king_white');
        }
}