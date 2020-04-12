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


        removeChessman(chessman){
                for(let i=0; i<this.chessmans.length; i++){
                        if(this.chessmans[i] === chessman){
                                this.components.splice(i, 1);
                                return;
                        }
                }
        }
}