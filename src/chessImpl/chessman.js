//trida figurky, ze ktere budou dedit vsechny druhu figurek
//jednotlivi potomci budou mit jina pravidla pohybu
class Chessman {

        constructor(color, player, type){
                this.color = color;
                this.player = player;
                this.type = type;
        }

        getColor() {
                return this.color;
        }
             
        getPlayer() {
                return this.player;
        }
        getType() {
                return this.type;
        }

}

//trida pesaka
class Pawn extends Chessman {

        constructor (color, player) {
                super(color, player, 'Pawn');
        }
}

//trida veze
class Rook extends Chessman {

        constructor (color, player) {
                super(color, player, 'Rook');
        }
}

//trida jezdce
class Knight extends Chessman {

        constructor (color, player) {
                super(color, player, 'Knight');
        }
}

//trida strelce
class Bishop extends Chessman {

        constructor (color, player) {
                super(color, player, 'Bishop');
        }
}

//trida damy
class Queen extends Chessman {

        constructor (color, player) {
                super(color, player, 'Queen');
        }
}

//trida krale
class King extends Chessman {

        constructor (color, player) {
                super(color, player, 'King');
        }
}