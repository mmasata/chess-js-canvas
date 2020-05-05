export class Player {
        
        constructor(name){
                this.name = name;
                this.chessmans = [];
                this.check = false;
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

        hasCheck(){
                return this.check;
        }

        setCheck(check){
                this.check = check;
        }

        removeChessman(chessman){
                for(let i=0; i<this.chessmans.length; i++){
                        if(this.chessmans[i] === chessman){
                                this.chessmans.splice(i, 1);
                                return;
                        }
                }
        }
}