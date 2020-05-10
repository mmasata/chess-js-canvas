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



        //tato metoda vrati vsechna pole kam dany hrac muze zahrat i dalsi kolo
        //bude slouzit pro definovani sachu/matu, ci moznosti hrace zahrat nejaky tah
        getAllNextMoves(){
                //TODO
        }
}