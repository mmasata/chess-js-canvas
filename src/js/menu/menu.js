//trida, ktera bude tvorit menu v canvasu
export class Menu {
        //vyuzivam statickeho pristupu z duvodu, ze v listeneru nejsem v kontextu tridy a nejsem schopen pouzit this
        static reference = this;

        constructor(){
                //canvas a context menu
                this.canvas = document.getElementById("menuLayer");
                this.ctx = this.canvas.getContext('2d');
                Menu.reference = this;

                //konfiguracni json, ktery tvori strukturu menu a jejich prokliky kam miri
                this.conf = {
                        mainMenu : [
                                {name : "New Game" , linkTo : "newGameMenu"},
                                {name : "Load Game" , linkTo : "loadGameMenu"},
                                {name : "Settings" , linkTo : "settingsMenu"}
                        ],
                        newGameMenu : [
                                {name : "Back" , linkTo : "mainMenu"},
                                {name : "Against NPC" , linkTo : "fc_startGameNpc"},
                                {name : "Against Player" , linkTo : "fc_startGamePlayer"}
                        ],
                        loadGameMenu : [
                                {name : "Back" , linkTo : "mainMenu"}
                                //TODO
                        ],
                        settingsMenu : [
                                {name : "Back" , linkTo : "mainMenu"},
                                {name : "Sound" , linkTo : "fc_enableDisableSound"} 
                        ]
                
                };
                this.currentActiveButtons = [];
                this.lastMouseOverButton = null;
                this.currentActiveSection = '';
                this.visibility = false;
              
                this.canvas.addEventListener('mousemove', this.menuOver);
                this.canvas.addEventListener('click' , this.menuClick);

        }

        //vykresluje danou sekci menu do canvasu
        drawPartOfMenu(type){
                this.currentActiveButtons = [];
                let canvasW = this.canvas.width;
                let canvasH = this.canvas.height;
                let arrOfBtns = this.conf[type];
                let btnW = (canvasW<801) ? canvasW/2 : canvasW/6;
                let btnH = canvasH/10;
                let btnX = (canvasW/2) - (btnW/2);
                let btnY = canvasH/5;
                arrOfBtns.forEach((obj) => {
                        let btn = new Path2D();
                        this.ctx.fillStyle = 'green';
                        btn.rect(btnX, btnY, btnW, btnH);
                        this.ctx.fill(btn);
                        this.ctx.fillStyle = 'white';
                        this.ctx.font = '20px Georgia';
                        this.ctx.textAlign = 'center';
                        this.ctx.textBaseline = 'middle';
                        this.ctx.fillText(obj.name, (btnX+ (btnW/2)), (btnY+ (btnH/2)));
                        this.currentActiveButtons.push({
                                x : btnX,
                                y : btnY,
                                w : btnW,
                                h : btnH,
                                canvasObject: btn,
                                name : obj.name,
                                linkTo : obj.linkTo
                        });
                        btnY += btnH+30;
                });
                this.currentActiveSection = type;
                this.visibility = true;
                this.ctx.save();
        }

        //pri zmene rozliseni prekresli menu
        redrawResizedCurrentMenuSection(){
                this.drawPartOfMenu(this.currentActiveSection);
        }

        //vycisti canvas
        clearCanvas(){
                this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        }

        //vraci zda je menu viditelne
        isVisible(){
                return this.visibility;
        }

        //akce na naslouchac pohybu mysi
        menuOver(e){
                let result = Menu.reference.menuMouseListener(e);
                Menu.reference.redrawResizedCurrentMenuSection();
                if(result){
                        if(!Menu.reference.lastMouseOverButton){
                                let audio = new Audio();
                                audio.src = '../../audio/mouseOver.mp3';
                                audio.load();
                                audio.play();      
                        }
                        Menu.reference.ctx.lineWidth = 8;
                        Menu.reference.ctx.strokeStyle = "yellow";
                        Menu.reference.ctx.strokeRect(result.x +4, result.y +4, result.w -8, result.h -8);
                        Menu.reference.lastMouseOverButton = result;        
                }
                else {
                        Menu.reference.lastMouseOverButton = null;
                }
        }

        //akce na kliknuti mysi na canvasu
        menuClick(e){
                let result = Menu.reference.menuMouseListener(e);
                if(result){
                        let redirectTo = result.linkTo;
                        if(redirectTo.includes('fc_')){
                                //volame funkci
                        }
                        else {
                                Menu.reference.clearCanvas();
                                Menu.reference.drawPartOfMenu(redirectTo);  
                        }
                        let audio = new Audio();
                        audio.src = '../../audio/clickMenu.mp3';
                        audio.load();
                        audio.play();
                }
        }

        //metoda, ktera vraci referenci na objekt, na ktery bylo v platne kliknuto
        //vypocteno dle X,Y pozice
        menuMouseListener(e){
                let rect = document.getElementById("menuLayer").getBoundingClientRect(); 
                let mouseX = e.clientX - rect.left; 
                let mouseY = e.clientY - rect.top;
                let activeMenuObjects = Menu.reference.currentActiveButtons;
                for (const obj of activeMenuObjects) {
                        if ((mouseX >= obj.x) && (mouseX <= obj.w + obj.x)) {
                            if ((mouseY >= obj.y) && (mouseY <= obj.h + obj.y)) {
                                return obj;
                            }
                        }
                }               
        }

        playThemeSong(){
                let audio = new Audio();
                audio.src = '../../audio/themeSong.mp3';
                audio.load();
                audio.play();    
        }
}