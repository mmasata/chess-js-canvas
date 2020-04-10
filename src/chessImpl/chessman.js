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

                        //TODO pokud je tam moje jine figurka, pak nelze


                        //TODO pokud je zde protihracova figurka, pak ji sejme
                        //TODO ukonci tah hrace
                }
                //chce ji pretahnout jinam, vratit na origin
                else {
                        this.moveChessman(this.square);
                }



                this.moves = [];
        }

        //presune figurku na dany square
        moveChessman(square){
                this.config.x = square.config.x;
                this.config.y = square.config.y;
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
                if(this.color === 'black'){
                      //TODO  
                }
                else {
                        //kdyz je na zacatku muze o jedno nebo o dve
                        if(chessmanPosition.includes('7')){
                                let letter = chessmanPosition.charAt(0);
                                availableMoves.push(letter+6);
                                availableMoves.push(letter+5);
                        }
                        //muze o jedno
                        //TODO

                        //muze nasikmo nahoru, pokud tim sunda protihracovu figurku
                        //TODO
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