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

                //komponent konektor slucuje vice jednoduchych komponent do sebe
                //diky nemu muze probihat drag and drop nad nejakymi spojenymi komponenty, ktere tvori jiny spolecny objekt
                this.componentConnector = null;
                this.config = config;
        }


        //nastavi komponent konektora
        setConnector(connector){
                this.componentConnector = connector;
        }

        //vrati komponent konektora
        getConnector(){
                return this.componentConnector;
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
        onClick(fc=null){
                if(fc){
                        Object.assign(this, {onClick(){
                                fc();
                                }
                        });
                }
        }

        //akce vyvolana prejetim mysi na komponentu
        onMouseOver(fc=null){
                if(fc){
                        Object.assign(this, {onMouseOver(){
                                fc();
                                }
                        }); 
                }             
        }

        //akce vyvolana prejetim mysi z komponenty mimo
        onMouseOut(fc=null){
                if(fc){
                        Object.assign(this, {onMouseOut(){
                                fc();
                                }
                        });  
                } 
        }

        //akce vyvolana pri dragAndDropu
        dragAndDrop(fc=null){
                if(fc){
                        Object.assign(this, {dragAndDrop(){
                                fc();
                                }
                        });   
                }    
        }

        onMouseDown(fc=null){
                if(fc){
                        Object.assign(this, {onMouseDown(){
                                fc();
                                }
                        });   
                }         
        }

        onMouseUp(fc=null){
                if(fc){
                        Object.assign(this, {onMouseUp(){
                                fc();
                                }
                        });   
                }     
        }

}