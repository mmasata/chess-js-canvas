import {Component} from '../engine/component.js';

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

        _initChessboard(){
                //zalozi policka 8x8
                const vertical = [1, 2, 3, 4, 5, 6, 7, 8];
                const horizontal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
                let color = true;
                let canvas = document.getElementById(this.game.getConfig().canvas);
                let chessboardLength;
                let startX;
                let startY;
                let currentX;
                let currentY;
                if(canvas.width > canvas.height){
                        startX= '(CW-(CH-60))/2';
                        chessboardLength =  '(CH-60)';
                        currentX = startX;
                        startY = 30;
                        currentY = startY;
                }
                else {
                        startY='(CH-(CW-60))/2';
                        chessboardLength = '(CW-60)';
                        startX = 30;
                        currentX = 30;
                        currentY = startY;
                }
                //this._makeBorder(chessboardLength, startX, startY);
                for(let letter of vertical){
                        for(let number of horizontal){
                                const component = new Component({
                                        name : letter + number,
                                        x: currentX,
                                        y: currentY,
                                        w: chessboardLength + '/8',
                                        h: chessboardLength + '/8',
                                        object: 'rect',
                                        color: (color) ? 'rgb(181, 136, 99)' : 'rgb(240, 217, 181)',
                                        dragAndDrop: false
                                })
                                this.squares.push(component);
                                color = !color;
                                currentX +='+ (' + chessboardLength + '/8)';
                        }
                        color = !color;
                        currentX = startX;
                        currentY += '+ (' + chessboardLength + '/8)';
                }

        }


        _makeBorder(length, x, y){
                const border = new Component({
                        name : 'chessBoardBorder',
                        x: x + '-5',
                        y: y + '-5',
                        w: length + '+10',
                        h: length + '+10',
                        object: 'rect',
                        color: 'brown',
                        dragAndDrop: false
                });
                this.border = border;
        }

}