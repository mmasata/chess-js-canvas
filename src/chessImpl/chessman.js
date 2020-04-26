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
                                //pokud je zde protihracova figurka, pak ji sejme
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

        //vrati vsechny square name, na ktere muze figurka prejit
        getPossibleMoves(){
                //vez muze hrat kdyz je na [x,y], pak muze jit [x, 1-8] nebo [A-H, y] , pokud nema v ceste figurku
                //zkontrolovat zda neni na A,H,1 nebo 8, abychom mohli vyloucit smery
                let chessmanPosition = this.square.getConfig().name;
                let availableMoves = [];
                let directions = ['left' , 'right' , 'up' , 'down'];
                for(let direction of directions){
                        let availableDirectionMoves = this._checkSquareRecursive(chessmanPosition, direction, []);
                        availableMoves = availableMoves.concat(availableDirectionMoves);
                }
                return availableMoves;
        }

        _checkSquareRecursive(currentPosition, direction, availableMoves){
                //dostane aktualni square, zjisti zda muze na nej prejit
                //pokud ano, vola rekurzivne znovu, ale zmeni pozici za parametru direction, ktery definuje smer
                //left-right meni pismeno
                //up-down meni cislo
                let positionLetter = currentPosition.charAt(0);
                let positionNumber = Number(currentPosition.charAt(1));

                let newLetter;
                let newNumber;
                let condition;
                let conditionVal;
                switch(direction) {
                        case 'left':
                                conditionVal = 'A';
                                condition = positionLetter;
                                if(!(positionLetter === 'A')){
                                        newLetter = this.getLetterFromNumber(this.getNumberFromLetter(positionLetter)-1);
                                        newNumber = positionNumber;
                                }
                                break;
                        case 'right':
                                conditionVal = 'H';
                                condition = positionLetter;
                                if(!(positionLetter === 'H')){
                                        newLetter = this.getLetterFromNumber(this.getNumberFromLetter(positionLetter)+1);
                                        newNumber = positionNumber;
                                }
                                break;
                        case 'up':
                                conditionVal = 8;
                                condition = positionNumber;
                                if(!(positionLetter === 8)){
                                        newLetter = positionLetter;
                                        newNumber = positionNumber+1;
                                }
                                break;
                        case 'down':
                                conditionVal = 1;
                                condition = positionNumber;
                                if(!(positionLetter === 1)){
                                        newLetter = positionLetter;
                                        newNumber = positionNumber-1;
                                }
                                break;
                        default:
                                return [];
                }
                if(condition === conditionVal){
                        return availableMoves;
                }
                let newSquare = this.layer.getSquareByName(newLetter+newNumber);
                //pokud nema chessmana, pak jdeme rekurzivne dal
                if(!newSquare.hasChessman()){
                        availableMoves.push(newLetter+newNumber);
                        availableMoves = this._checkSquareRecursive(newLetter+newNumber, direction, availableMoves);
                }
                //pokud ma chessmana naseho, pak koncime, bez pridani tohoto square do moznych
                else if(newSquare.getChessman().getConfig().color == this.config.color){
                        return availableMoves;
                }
                //pokud ma chessmana protihracovo, pak koncime a pridame tento square do moznych
                else {
                        availableMoves.push(newLetter+newNumber);
                        return availableMoves;
                }
                return availableMoves;
        }
}

//trida jezdce
export class Knight extends Chessman {

        constructor (config, layer) {
                super(config, layer, 'Knight');
                (config.color === 'black') ? this._setFigureImage('knight_black') : this._setFigureImage('knight_white');
        }

        
        //vrati vsechny square name, na ktere muze figurka prejit
        getPossibleMoves(){
                let availableMoves = [];
                //ma 8 moznosti [x+2, y+ (1,-1) ] , [x-2 , y+ (1,-1) ], [x+ (1,-1), y+2], [x+ (1,-1), y-2]
                //pozn. neresi zda ma v ceste jine figurky, resi jen cilove pole
                let chessmanPosition = this.square.getConfig().name;
                let positionLetter = chessmanPosition.charAt(0);
                let positionNumber = Number(chessmanPosition.charAt(1));
                let moves = [
                        {x: 2 , y: 1}, {x: 2 , y: -1}, 
                        {x: -2 , y: 1}, {x: -2 , y: -1},
                        {x: 1, y:2} , {x: -1, y:2},
                        {x: 1, y:-2} , {x: -1, y:-2},
                ]
                for(let move of moves){
                        let numberOfLetter = this.getNumberFromLetter(positionLetter) + move.x;
                        let number = positionNumber + move.y;

                        //zjistit zda na danem poli neni moje figurka
                        if((numberOfLetter <= 8 && numberOfLetter >= 1) && (number <= 8 && number >= 1)){
                                let newSquare = this.layer.getSquareByName(this.getLetterFromNumber(numberOfLetter)+number);
                                if(!(newSquare.hasChessman() === true && newSquare.getChessman().config.color === this.config.color)){
                                        availableMoves.push(this.getLetterFromNumber(numberOfLetter)+number);
                                }
                        }
                }
                return availableMoves;
        }
}

//trida strelce
export class Bishop extends Chessman {

        constructor (config, layer) {
                super(config, layer, 'Bishop');
                (config.color === 'black') ? this._setFigureImage('bishop_black') : this._setFigureImage('bishop_white');
        }

        //vrati vsechny square name, na ktere muze figurka prejit
        getPossibleMoves(){
                let chessmanPosition = this.square.getConfig().name;
                let availableMoves = [];
                //ma 4 moznosti [x+1, y+1] , [x+1, y-1], [x-1, y+1] a [x-1, y-1]
                let directions = ['leftUp' , 'rightUp' , 'leftDown' , 'rightDown'];
                for(let direction of directions){
                        let availableDirectionMoves = this._checkSquareRecursive(chessmanPosition, direction, []);
                        availableMoves = availableMoves.concat(availableDirectionMoves);
                }
                return availableMoves;

        }

        //rekurzivni metoda pro pruchod vsemi smery
        _checkSquareRecursive(currentPosition, direction, availableMoves){
                let positionLetter = currentPosition.charAt(0);
                let positionNumber = Number(currentPosition.charAt(1));

                let newLetter;
                let newNumber;
                let conditionVal1;
                let conditionVal2;
                switch(direction) {
                        case 'leftUp':
                                conditionVal1 = 'A';
                                conditionVal2 = 8;
                                if(!((positionLetter === 'A') || (positionNumber === 8))){
                                        console.log('ff');
                                        newLetter = this.getLetterFromNumber(this.getNumberFromLetter(positionLetter)-1);
                                        newNumber =  positionNumber+1;
                                }
                                break;
                        case 'rightUp':
                                conditionVal1 = 'H';
                                conditionVal2 = 8;
                                if(!((positionLetter === 'H') || (positionNumber === 8))){
                                        newLetter = this.getLetterFromNumber(this.getNumberFromLetter(positionLetter)+1);
                                        newNumber =  positionNumber+1;
                                }
                                break;
                        case 'leftDown':
                                conditionVal1 = 'A';
                                conditionVal2 = 1;
                                if(!((positionLetter === 'A') || (positionNumber === 1))){
                                        newLetter = this.getLetterFromNumber(this.getNumberFromLetter(positionLetter)-1);
                                        newNumber =  positionNumber-1;
                                }
                                break;
                        case 'rightDown':
                                conditionVal1 = 'H';
                                conditionVal2 = 1;
                                if(!((positionLetter === 'H') || (positionNumber === 1))){
                                        newLetter = this.getLetterFromNumber(this.getNumberFromLetter(positionLetter)+1);
                                        newNumber =  positionNumber-1;
                                }
                                break;
                        default:
                                return [];
                }
                if((positionLetter === conditionVal1) || (positionNumber === conditionVal2)){
                        return availableMoves;
                }
                let newSquare = this.layer.getSquareByName(newLetter+newNumber);
                //pokud nema chessmana, pak jdeme rekurzivne dal
                if(!newSquare.hasChessman()){
                        availableMoves.push(newLetter+newNumber);
                        availableMoves = this._checkSquareRecursive(newLetter+newNumber, direction, availableMoves);
                }
                //pokud ma chessmana naseho, pak koncime, bez pridani tohoto square do moznych
                else if(newSquare.getChessman().getConfig().color == this.config.color){
                        return availableMoves;
                }
                //pokud ma chessmana protihracovo, pak koncime a pridame tento square do moznych
                else {
                        availableMoves.push(newLetter+newNumber);
                        return availableMoves;
                }
                return availableMoves;
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