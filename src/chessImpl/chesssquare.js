import {Component} from '../engine/component.js';

export class Chesssquare extends Component{
        constructor (config) {
                super(config);
                config.originColor = config.color;
                this.chessman = null;
        }


        setChessman(chessman){
                this.chessman = chessman;
                if(chessman){
                        chessman.setSquare(this);
                }
        }

        getChessman(){
                return this.chessman;
        }


        hasChessman(){
                return (this.chessman != null);
        }
}