import {Chesssquare} from './chesssquare.js';
import {Pawn, Rook, Knight, Bishop, Queen, King} from './chessman.js';
import {Layer} from '../engine/layer.js';

export class Chessboard extends Layer{

        constructor(name, isStatic, game, players){
                super(name, isStatic);
                //hraci
                this.players = players;
                //hrac ktery je na rade
                this.activePlayer = players[0];


                this.game = game;
                //zde budou ulozeny vsechny komponenty, tzn ctverce hraciho pole
                this.border;
                this.components = [];
                this._initChessboard();


                //inicializace druhe vnitrni vrstvy, kde mame figurky
                this.chessmanLayer = new Layer("Chessman_Layer" , false);
                this.chessmanLayer.addComponents(this.getChessmans());

        }
        //vrati vsechny figurky na sachovnici
        getChessmans(){
                let chessmans = [];
                for(let square of this.components){
                        let chessman = square.getChessman();
                        if(chessman){
                                chessmans.push(chessman);
                        }
                }
                return chessmans;
        }


        //switch player
        //po ukonceni tahu zmeni klikatelnost na druhou barvu
        switchPlayer(){
             //zmenime dragAndDrop aktualnimu hraci na false
             for(let chessman of this.activePlayer.getChessmans()){
                     chessman.getConfig().dragAndDrop = false;
             }

             for(let pl of this.players){
                     if(pl != this.activePlayer){
                             //zmenime dragandDrop novemu hraci na true
                             for(let chessman of pl.getChessmans()){
                                chessman.getConfig().dragAndDrop = true;
                             }
                             this.activePlayer = pl;
                             return;
                     }
             }
        }

        //vrati hraci pozici podle nazvu
        getSquareByName(name){
                for(let square of this.components){
                        if(square.getConfig().name === name){
                                return square;
                        }
                }
                return null;
        }

        //zvyrazni square barvu
        makeSquareMoveVisible(name){
                for(let chesssquare of this.components){
                        if(chesssquare.getConfig().name === name){
                             chesssquare.getConfig().color = 'yellow';   
                        }
                }
        }

        //vrati zpet square barvu
        makeSquareMoveHidden(name){
                for(let chesssquare of this.components){
                        if(chesssquare.getConfig().name === name){
                             chesssquare.getConfig().color = chesssquare.getConfig().originColor;
                        }
                }
        }

        //inicializce sachovnice
        _initChessboard(){
                //zalozi policka 8x8
                const vertical = [1, 2, 3, 4, 5, 6, 7, 8];
                const horizontal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
                let color = true;
                let canvas = document.getElementById(this.game.getConfig().canvas);
                let CW = canvas.width;
                let CH = canvas.height;
                let chessboardLength;
                let startX;
                let startY;
                let currentX;
                let currentY;
                if(canvas.width > canvas.height){
                        startX = (CW-(CH-60))/2
                        chessboardLength =  (CH-60);
                        currentX = startX;
                        startY = 30;
                        currentY = startY;
                }
                else {
                        startY=(CH-(CW-60))/2;
                        chessboardLength = (CW-60);
                        startX = 30;
                        currentX = 30;
                        currentY = startY;
                }
                //this._makeBorder(chessboardLength, startX, startY);
                for(let number of vertical){
                        for(let letter of horizontal){
                                const component = new Chesssquare({
                                        name : letter + number,
                                        x: currentX,
                                        y: currentY,
                                        w: chessboardLength/8,
                                        h: chessboardLength/8,
                                        object: 'rect',
                                        color: (color) ? 'rgb(181, 136, 99)' : 'rgb(240, 217, 181)',
                                        dragAndDrop: false
                                })
                                this.components.push(component);
                                let chessman =  this._createChessman(currentX, currentY, chessboardLength/8, letter+number);
                                component.setChessman(chessman);
                                color = !color;
                                currentX +=(chessboardLength/8);

                        }
                        color = !color;
                        currentX = startX;
                        currentY +=(chessboardLength/8);
                }

        }

        //priradi figurku k danemu hraci
        _addChessmanToPlayer(color, chessman){
                if(color === 'white'){
                        this.players[0].addChessman(chessman);
                }
                else{
                        this.players[1].addChessman(chessman);
                }
        }

        //inicializacni vytvoreni sachovych figurek s jejich defaultnim rozestavenim
        _createChessman(x,y, w, name){
                let config = {
                        x: x,
                        y: y,
                        w: w,
                        h: w,
                        object: 'image'
                }
                if(name.includes('2') || name.includes('7')){
                        config.color = (name.includes('7')) ? 'white' : 'black';
                        config.dragAndDrop = ((name.includes('7')) ? true : false);
                        config.name = config.color + "_pawn";
                        let pawn = new Pawn(config , this);
                        this._addChessmanToPlayer(config.color, pawn);
                        return pawn;
                }
                if((name.includes('A') || name.includes('H')) && (name.includes('1') || name.includes('8'))){
                        config.color = (name.includes('8')) ? 'white' : 'black';
                        config.dragAndDrop = ((name.includes('8')) ? true : false);
                        config.name = config.color + "_rook";
                        let rook = new Rook(config , this);
                        this._addChessmanToPlayer(config.color, rook);
                        return rook;
                }
                if((name.includes('B') || name.includes('G')) && (name.includes('1') || name.includes('8'))){
                        config.color = (name.includes('8')) ? 'white' : 'black';
                        config.dragAndDrop = ((name.includes('8')) ? true : false);
                        config.name = config.color + "_knight";
                        let knight = new Knight(config , this);
                        this._addChessmanToPlayer(config.color, knight);
                        return knight;
                } 
                if((name.includes('C') || name.includes('F')) && (name.includes('1') || name.includes('8'))){
                        config.color = (name.includes('8')) ? 'white' : 'black';
                        config.dragAndDrop = ((name.includes('8')) ? true : false);
                        config.name = config.color + "_bishop";
                        let bishop = new Bishop(config , this);
                        this._addChessmanToPlayer(config.color, bishop);
                        return bishop;
                } 
                if(name.includes('D') && (name.includes('1') || name.includes('8'))){
                        config.color = (name.includes('8')) ? 'white' : 'black';
                        config.dragAndDrop = ((name.includes('8')) ? true : false);
                        config.name = config.color + "_queen";
                        let queen = new Queen(config , this);
                        this._addChessmanToPlayer(config.color, queen);
                        return queen;
                }
                if(name.includes('E') && (name.includes('1') || name.includes('8'))){
                        config.color = (name.includes('8')) ? 'white' : 'black';
                        config.dragAndDrop = ((name.includes('8')) ? true : false);
                        config.name = config.color + "_king";
                        let king = new King(config , this);
                        this._addChessmanToPlayer(config.color, king);
                        return king;
                } 
        }
}