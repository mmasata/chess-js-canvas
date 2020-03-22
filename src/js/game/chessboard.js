export class Chessboard {

        constructor(){
                this.canvas = document.getElementById("gameBackgroundLayer");
                this.ctx = this.canvas.getContext('2d');  
        }

        initChessboard(){
                let xAxis = ['A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H'];
                let yAxis = [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8];
                let chessboardLength;
                //true znamena vykresleni cerneho ctverce, false bileho ctverce
                let color = true;

                let startX;
                let defX;

                let startY;
                if(this.canvas.width > this.canvas.height){
                        chessboardLength =  this.canvas.height - 60;
                        startX = (this.canvas.width - chessboardLength)/2;
                        defX = (this.canvas.width - chessboardLength)/2
                        startY = 30;
                }
                else {
                        chessboardLength = this.canvas.width - 60;
                        startX = 30;
                        defX = 30
                        startY = (this.canvas.height - chessboardLength)/2;
                }

                this.ctx.fillStyle = 'brown';
                this.ctx.rect(0,0,this.canvas.width, this.canvas.height);
                this.ctx.fill();

                for(let i=0 ; i < xAxis.length; i++){
                        for(let y=0; y<yAxis.length; y++){
                                let colorName = (color) ? 'black' : 'white';
                                let chessboardContext = new Path2D();
                                this.ctx.fillStyle = colorName;
                                chessboardContext.rect(startX, startY, chessboardLength/8 , chessboardLength/8);
                                this.ctx.fill(chessboardContext);

                                startX += chessboardLength/8;
                                color = !color;
                        }
                        color = !color;
                        startX = defX;
                        startY += chessboardLength/8;
                }
                this.canvas.style.zIndex = 999;
        }
}