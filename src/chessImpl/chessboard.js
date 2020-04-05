import {Chesssquare} from './chesssquare.js';
import {Pawn, Rook, Knight, Bishop, Queen, King} from './chessman.js';

export class Chessboard{

        constructor(game){
                this.game = game;
                //zde budou ulozeny vsechny komponenty, tzn ctverce hraciho pole
                this.border;
                this.squares = [];
                this._initChessboard();
        }

        getSquares(){
                return this.squares;
        }

        getChessmans(){
                let chessmans = [];
                for(let square of this.squares){
                        let chessman = square.getChessman();
                        if(chessman){
                                chessmans.push(chessman);
                        }
                }
                return chessmans;
        }

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
                for(let letter of vertical){
                        for(let number of horizontal){
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
                                this.squares.push(component);
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

        _createChessman(x,y, w, name){
                if(name.includes('2') || name.includes('7')){
                        let color = (name.includes('7')) ? 'white' : 'black'
                        let pawn = new Pawn({
                                name : color + "_pawn",
                                x: x,
                                y: y,
                                w: w,
                                h: w,
                                object: 'image',
                                color: color,
                                dragAndDrop: true
                        });
                        return pawn;
                }
                if((name.includes('A') || name.includes('H')) && (name.includes('1') || name.includes('8'))){
                        let color = (name.includes('8')) ? 'white' : 'black'
                        let rook = new Rook({
                                name : color + "_rook",
                                x: x,
                                y: y,
                                w: w,
                                h: w,
                                object: 'image',
                                color: color,
                                dragAndDrop: true
                        });
                        return rook;
                }
                if((name.includes('B') || name.includes('G')) && (name.includes('1') || name.includes('8'))){
                        let color = (name.includes('8')) ? 'white' : 'black'
                        let knight = new Knight({
                                name : color + "_knight",
                                x: x,
                                y: y,
                                w: w,
                                h: w,
                                object: 'image',
                                color: color,
                                dragAndDrop: true
                        });
                        return knight;
                } 
                if((name.includes('C') || name.includes('F')) && (name.includes('1') || name.includes('8'))){
                        let color = (name.includes('8')) ? 'white' : 'black'
                        let bishop = new Bishop({
                                name : color + "_bishop",
                                x: x,
                                y: y,
                                w: w,
                                h: w,
                                object: 'image',
                                color: color,
                                dragAndDrop: true
                        });
                        return bishop;
                } 
                if(name.includes('D') && (name.includes('1') || name.includes('8'))){
                        let color = (name.includes('8')) ? 'white' : 'black'
                        let queen = new Queen({
                                name : color + "_queen",
                                x: x,
                                y: y,
                                w: w,
                                h: w,
                                object: 'image',
                                color: color,
                                dragAndDrop: true
                        });
                        return queen;
                }
                if(name.includes('E') && (name.includes('1') || name.includes('8'))){
                        let color = (name.includes('8')) ? 'white' : 'black'
                        let king = new King({
                                name : color + "_king",
                                x: x,
                                y: y,
                                w: w,
                                h: w,
                                object: 'image',
                                color: color,
                                dragAndDrop: true
                        });
                        return king;
                } 
        }
}