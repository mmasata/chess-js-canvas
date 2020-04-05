//trida figurky, ze ktere budou dedit vsechny druhu figurek
//jednotlivi potomci budou mit jina pravidla pohybu
import {Component} from '../engine/component.js';

export class Chessman extends Component {

        constructor(config, type){
                super(config);
                this.color = config.color;
                this.type = type;
                
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

}

//trida pesaka
export class Pawn extends Chessman {

        constructor (config) {
                super(config, 'Pawn');
                (config.color === 'black') ? this._setFigureImage('pawn_black') : this._setFigureImage('pawn_white');
        }
}

//trida veze
export class Rook extends Chessman {

        constructor (config) {
                super(config, 'Rook');
                (config.color === 'black') ? this._setFigureImage('rook_black') : this._setFigureImage('rook_white');
        }
}

//trida jezdce
export class Knight extends Chessman {

        constructor (config) {
                super(config, 'Knight');
                (config.color === 'black') ? this._setFigureImage('knight_black') : this._setFigureImage('knight_white');
        }
}

//trida strelce
export class Bishop extends Chessman {

        constructor (config) {
                super(config, 'Bishop');
                (config.color === 'black') ? this._setFigureImage('bishop_black') : this._setFigureImage('bishop_white');
        }
}

//trida damy
export class Queen extends Chessman {

        constructor (config) {
                super(config, 'Queen');
                (config.color === 'black') ? this._setFigureImage('queen_black') : this._setFigureImage('queen_white');
        }
}

//trida krale
export class King extends Chessman {

        constructor (config) {
                super(config, 'King');
                (this.config.color === 'black') ? this._setFigureImage('king_black') : this._setFigureImage('king_white');
        }
}