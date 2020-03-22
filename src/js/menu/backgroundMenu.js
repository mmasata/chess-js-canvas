export class MenuBackground{

        constructor(){
                //canvas a context menu
                this.canvas = document.getElementById("menubackgroundLayer");
                this.ctx = this.canvas.getContext('2d');
        }

        draw(){
                 this.video = document.createElement("VIDEO");
                 this.video.setAttribute('src' , '../../video/menu.mp4');
                 this.video.muted = true;
                 this.video.loop = true;
                 this.video.load();
                 this.video.play();

                this.shallWeContinue = true;
                this.refreshVideoToCanvas(this.video, this);
        }

        refreshVideoToCanvas(video, reference){
                if(this.shallWeContinue){
                        if (!video.paused && !video.ended) {
                                reference.ctx.drawImage(video, 0, 0 , reference.canvas.width , reference.canvas.height);
                                setTimeout(function(){
                                        reference.refreshVideoToCanvas(video, reference);
                                }, 1000 / 30); // drawing at 30fps
                        }
                }
                else {
                        video.pause();
                } 
        }

        clearCanvas(){
                this.shallWeContinue = false;
                this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        }
}