import {Component} from './abstractComponent.js';

export class Layer {

        constructor(name){
                this.name = name;
                this.components = [];
                this.game;
        }

        //vrati nazev vrstvy
        getName(){
                return this.name;
        }

        //nastavi game
        _setGame(game){
                this.game = game;
        }

        //vrati game
        getGame(){
                return this.game;
        }

        //vrati seznam komponent v layeru
        getComponents(){
                return this.components;
        }

        //prida komponentu do vrstvy
        addComponent(component){
                component._setLayer(this);
                this.components.push(component);
                //console.log('Přidávám komponentu');
        }

        //odstrani komponentu z vrstvy
        removeComponent(name){
                for(let i=0; i<this.components.length; i++){
                        if(this.components[i].getName() === name){
                                //console.log('Mažu komponentu "'+name+'"');
                                this.components.splice(i, 1);
                                return;
                        }
                }
                //console.log('Komponenta k smazání "'+name+'" neexistuje');
        }
}