import { RenderManager } from './renderManager.js';

export class Game {

        constructor(config){
                this.renderManager = new RenderManager(config, this);
                this.config = config;
                this.layers = [];
                
                //vezme offscreen layers a ty bude renderovat zvlast
                this.offScreenLayer = null;
        }

        //vraci referenci na renderManagera
        getRenderManager(){
                //console.log('Vracím renderManager');
                return this.renderManager;
        }

        //vrati config
        getConfig(){
                //console.log('Vracím configFile');
                return this.config;
        }


        //prida vrstvu do hry
        setOffscreenLayer(layer){
                layer._setGame(this);
                //prida vrstvu do canvasu
                this.offScreenLayer = layer;
                //console.log('Přidávám vrstvu');
                this.renderManager.initOffScreen();
        }
        
        getOffscreenLayer(){
                return this.offScreenLayer;
        }

        //prida vrstvu do hry
        addLayer(layer){
                layer._setGame(this);
                //prida vrstvu do canvasu
                this.layers.push(layer);
                //console.log('Přidávám vrstvu');
        }
        
        //vrati vrstvu podle nazvu
        getLayerByName(name){
                for(let layer of this.layers){
                        if(layer.getName() === name){
                                //console.log('Vracím vrstvu "'+name+'"');
                                return layer;
                        }
                }
                //console.log('Hledaná vrstva "'+name+'" neexistuje');
                return null;
        }

        //odstrani vrstvu podle nazvu
        removeLayerByName(name){
                for(let i=0; i<this.layers.length; i++){
                        if(this.layers[i].getName() === name){
                                //console.log('Mažu vrstvu "'+name+'"');
                                this.layers.splice(i, 1);
                                return;
                        }
                }
                //console.log('Vrstva k smazání "'+name+'" neexistuje');
        }

        //vrati list vsech vrstev
        getAllLayers(){
                //console.log('Vracím všechny vrstvy');
                return this.layers;
        }

        /******* Manipulace s vrstvami *******/

        //posune vrstvu o jednou uroven vyse
        moveLayerUp(name){
                for(let i=0; i<this.layers.length; i++){
                        if((this.layers[i].getName() === name) && (i<(this.layers.length-1))){
                                let sortVar = this.layers[i];
                                this.layers[i] = this.layers[i+1];
                                this.layers[i+1] = sortVar;
                                //console.log('Posouvám vrstvu "'+name+'" o úroven výše');
                                return;
                        }
                }
                //console.log('Vrstva "'+name+'" neexistuje, nebo je úplně nahoře');
        }

        //posune vrstvu o jednu uroven nize
        moveLayerDown(name){
                for(let i=0; i<this.layers.length; i++){
                        if((this.layers[i].getName() === name) && (i>0)){
                                let sortVar = this.layers[i];
                                this.layers[i] = this.layers[i-1];
                                this.layers[i-1] = sortVar;
                                //console.log('Posouvám vrstvu "'+name+'" o úroven níže');
                        }
                }
                //console.log('Vrstva "'+name+'" neexistuje, nebo je úplně dole');
        }

        //posune vrstvu uplne nahoru
        moveLayerTop(name){
                let sort = false;
                for(let i=0; i<this.layers.length; i++){
                        if(sort){
                                let sortVar = this.layers[i];
                                this.layers[i] = this.layers[i-1];
                                this.layers[i-1] = sortVar;
                        }
                        else {
                                if(this.layers[i].getName() === name){
                                        if(i === this.layers.length-1){
                                                //console.log('Vrstva "'+name+'" je již úplně nahoře');
                                                return;
                                        }
                                        sort = true;
                                }
                        }
                }
                //console.log('Vrstva "'+name+'" byla posunuta nahoru');
        }

        //posune vrstvu uplne dolu
        moveLayerBottom(name){
                let sort = false;
                for(let i=this.layers.length-1; i>-1; i--){
                        if(sort){
                                let sortVar = this.layers[i];
                                this.layers[i] = this.layers[i+1];
                                this.layers[i+1] = sortVar;
                        }
                        else {
                                if(this.layers[i].getName() === name){
                                        if(i === 0){
                                                //console.log('Vrstva "'+name+'" je již úplně dole');
                                                return;
                                        }
                                        sort = true;
                                }
                        }
                }
                //console.log('Vrstva "'+name+'" byla posunuta dolů');
        }
}