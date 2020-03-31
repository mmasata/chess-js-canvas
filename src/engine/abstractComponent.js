export class Component{

        constructor(config){
                /* EXAMPLE CONFIGU
                        {
                                name : "NAME",
                                x: //ciselna hodnota nebo pomer canvas widthu/heightu ku cislu - CW znamena canvasWidth, CH znamena canvas height
                                y: //ciselna hodnota nebo pomer canvas widthu/heightu ku cislu
                                w: //ciselna hodnota nebo pomer canvas widthu/heightu ku cislu
                                h: //ciselna hodnota nebo pomer canvas widthu/heightu ku cislu
                                object: //ellipse, rect, image
                                color: //barva
                                text: //pokud bude vyplneno umisti text doprostred telesa
                                dragAndDrop: //boolean zda umoznujeme drag and drop nebo ne
                        }
                */
                this.config = config;
                this.layer;

                //boolean zda je zmacknuta mys nad toutu komponentou. slouzi pro drag and drop
                this.isDragging = false;


                if(this.constructor === Component){
                        throw new TypeError('Abstraktní třídu nelze instancovat');
                }
        }

        //nastavi vrstvu komponenty
        _setLayer(layer){
                this.layer = layer;
        }

        //vrati vrstvu komponenty
        getLayer(){
                return this.layer;
        }

        //vrati config pro komponentu
        getConfig(){
                return this.config;
        }

        //vrati jmeno komponenty
        getName(){
                return this.config.name;
        }

        //posune komponentu o X pixelu nahoru
        moveUp(x){
                //TODO
        }

        //posune komponentu o X pixelu doleva
        moveLeft(x){
                //TODO
        }

        //posune komponentu o X pixelu dolu
        moveDown(x){
                //TODO
        }

        //posune komponentu o X pixelu doprava
        moveRight(x){
                //TODO
        }

        //otoceni pravym smerem o X stupnu
        rotateRight(angle){
                //TODO
        }

        //otoceni levym smerem o X stupnu
        rotateLefT(angle){
                //TODO
        }

        //akce vyvolana stisknutim tlacitka na komponente
        onClick(){
                //TODO
        }

        //akce vyvolana prejetim mysi na komponentu
        onMouseOver(){
                //TODO
        }

        //akce vyvolana prejetim mysi z komponenty mimo
        onMouseOut(){
                //TODO
        }


        //TODO jeste drag and drop
}