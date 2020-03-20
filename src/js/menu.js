//trida, ktera bude tvorit menu v canvasu
export class Menu {

        constructor(canvasMenuId){
                this.canvasMenuId = canvasMenuId;
                this.canvasMenu = document.getElementById(this.canvasMenuId);
                this.contextMenu = this.canvasMenu.getContext('2d');
              
                //defaultne po vytvoreni tridy chceme vzdy ukazat menu
                this.showMainMenu();
        }

        showMainMenu(){
                this.activeButtonsArr = [];
                let optionsArr = ["New game" , "Load game" , "Settings"];
                let ctx = this.contextMenu;

                //ziskame aktualni rozliseni platna, abychom nase tlacitko mohli umistit doprostred
                let canvasWidth = this.canvasMenu.width;
                let canvasHeight = this.canvasMenu.height;

                //button bude mit vzdy height 1/6 stranky
                //width bude v pripade velikosti do 800 bude 1/2
                //pri vetsich rozlisenich bude height 1/4
                let btnWidth = (canvasWidth<801) ? canvasWidth/2 : canvasWidth/6;
                let btnHeight = (canvasHeight/10);
                let btnX = (canvasWidth/2) - (btnWidth/2);

                let btnY = 20;
                
                //vykresleni tlacitka jako takoveho do platna
                optionsArr.forEach((text) => {
                        let btn = new Path2D();
                        ctx.fillStyle = 'green';
                        btn.rect(btnX, btnY, btnWidth, btnHeight);
                        ctx.fill(btn);

                        let btnText = new Path2D();
                        ctx.fillStyle = 'white';
                        ctx.font = "20px Georgia";
                        ctx.textAlign = "center"; 
                        ctx.textBaseline = "middle";
                        ctx.fillText(text, btnX+(btnWidth/2), btnY+(btnHeight/2));

                        //mame bokem v instanci pole aktivnich tlacitek, abychom mohli odchytavat na kliknuti a mouseover
                        this.activeButtonsArr.push({
                                "x" : btnX,
                                "y" : btnY,
                                "w" : btnWidth,
                                "h" : btnHeight,
                                "obj" : btn,
                                "name" : text,
                        });
                        btnY += btnHeight + 20;
                });
                ctx.save();
                //ulozime si do promenne, ze je menu viditelne
                this.isMainMenuVisible = true;

        }

        playButtonOverSound(){
                let audio = new Audio();
                audio.src = '/audio/mouseOverBtnSong.mp3';
                audio.play();
        }

        playButtonClickSound(){
                let audio = new Audio();
                audio.src = '/audio/clickBtn.mp3';
                audio.play();
        }

        playMainSound(){
                let audio = new Audio();
                audio.src = '/audio/song.mp3';
                audio.play();
        }

        isMainMenuVisible(){
                return this.isMainMenuVisible;
        }

        getActiveButtons(){
                return this.activeButtonsArr;
        }


        showMainMenuBackground(canvasMenuBackground){
                let ctx = canvasMenuBackground.getContext('2d');
                let image = document.getElementById("mainMenuBackgroundImg");
                ctx.drawImage(image, 0,0 , canvasMenuBackground.width, canvasMenuBackground.height);
        }
}