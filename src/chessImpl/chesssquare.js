import {Component} from '../engine/component.js';

export class Chesssquare extends Component{
        constructor (config) {
                super(config);

                this.chessman = null;
        }


        setChessman(chessman){
                this.chessman = chessman;
        }

        getChessman(){
                return this.chessman;
        }
}