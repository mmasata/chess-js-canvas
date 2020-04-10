export class Player {
        
        constructor(name){
                this.name = name;
                this.chessmans = [];
        }

        getName(){
                return this.name;
        }

        setName(name){
                this.name = name;
        }

        getChessmans(){
                return this.chessmans;
        }

        addChessman(chessman){
                this.chessmans.push(chessman);
        }
}