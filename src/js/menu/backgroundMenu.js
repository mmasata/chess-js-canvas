export class MenuBackground{

        constructor(){
                //canvas a context menu
                this.canvas = document.getElementById("menubackgroundLayer");
                this.ctx = this.canvas.getContext('2d');
        }

        draw(){
                let video = document.createElement("VIDEO");
                video.setAttribute('src' , '../../video/menu.mp4');
                video.muted = true;
                video.load();
                video.play();

                this.refreshVideoToCanvas(video, this);
        }

        refreshVideoToCanvas(video, reference){
                if (!video.paused && !video.ended) {
                        reference.ctx.drawImage(video, 0, 0 , reference.canvas.width , reference.canvas.height);
                        setTimeout(function(){
                                reference.refreshVideoToCanvas(video, reference);
                        }, 1000 / 30); // drawing at 30fps
                }   
        }
}