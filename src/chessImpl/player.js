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

        getKing(){
               for(let ch of this.getChessmans()){
                       if(ch.type === 'King'){
                               return ch;
                       }
               } 
               return null;
        }

        getAllNextMovesExceptKing(){
                let allMoves = []
                for(let ch of this.getChessmans()){
                        if(ch.type != 'King'){
                                allMoves = allMoves.concat(ch.getPossibleMoves());
                        }
                }
                //mame vsechny tahy figurek, nyni musime nechat jen ty unikatni
                let uniqueArr = new Set(allMoves);
                return [...uniqueArr];     
        }

        //tato metoda vrati vsechna pole kam dany hrac muze zahrat i dalsi kolo
        //bude slouzit pro definovani sachu/matu, ci moznosti hrace zahrat nejaky tah
        getAllNextMoves(){
                let allMoves = []
                for(let ch of this.getChessmans()){
                        allMoves = allMoves.concat(ch.getPossibleMoves());
                }
                //mame vsechny tahy figurek, nyni musime nechat jen ty unikatni
                let uniqueArr = new Set(allMoves);
                return [...uniqueArr];
        }
}