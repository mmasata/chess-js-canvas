import { Menu } from './menu.js';

/*************************************** CANVAS MENU  *************************************************************************/

const canvasMenuId = "menuLayer";
const canvasMenu = document.getElementById(canvasMenuId);
const ctx = canvasMenu.getContext('2d');
const menu = new Menu(canvasMenuId);
let lastActiveBtn = "";

//metoda zajistujici pozici mysi a jeji interakci s platnem
const mousePosAction = (e) => {
        let rect = document.getElementById(canvasMenuId).getBoundingClientRect(); 
        let mouseX = e.clientX - rect.left; 
        let mouseY = e.clientY - rect.top; 
        
        //reaguje pouze pokud je menu viditelne "aktivni"
        let cnt = 0;
        if(menu.isMainMenuVisible){
                menu.showMainMenu();
                let activeButtons = menu.getActiveButtons();
                activeButtons.forEach( (btn) => {
                        if( (mouseX >= btn.x) && (mouseX <= btn.w + btn.x) ){
                                //znamena to ze X-souradnice sedi
                                if( (mouseY >= btn.y) && (mouseY <= btn.h + btn.y) ){
                                        //znamena to, ze i Y-souradnice sedi
                                        ctx.lineWidth = 8;
                                        ctx.strokeStyle = "yellow";
                                        ctx.strokeRect(btn.x +4, btn.y +4, btn.w -8, btn.h -8);

                                        //kdyz je false, znamena to, ze jsme zrovna na tlacitko najeli, tudiz vyvolame akci, ktera prehraje zvuk
                                        if(lastActiveBtn !== btn.name){
                                                menu.playButtonOverSound();
                                        }                            
                                        lastActiveBtn = btn.name;
                                        cnt++;
                                }
                        }
                });
        }
        if(cnt === 0){ lastActiveBtn = ""; }
}

const mouseClickAction = (e) => {
        let rect = document.getElementById(canvasMenuId).getBoundingClientRect(); 
        let mouseX = e.clientX - rect.left; 
        let mouseY = e.clientY - rect.top; 
        let activeButtons = menu.getActiveButtons();
        activeButtons.forEach( (btn) => {
                if( (mouseX >= btn.x) && (mouseX <= btn.w + btn.x) ){
                        if( (mouseY >= btn.y) && (mouseY <= btn.h + btn.y) ){
                                menu.playButtonClickSound();
                                console.log("KLIK " + btn.name);
                        }
                }
        });    
}

const init = () => {
        //naslouchac, ktery trackuje pozici mysi
        canvasMenu.addEventListener('mousemove', mousePosAction);
        canvasMenu.addEventListener('click' , mouseClickAction);
}


document.getElementById("init").addEventListener('click' , function(){
        init();
        menu.playMainSound();
        document.getElementById("modal").style.display = "none";
        resizeCanvas();
})


/*************************************** CANVAS MENU BACKGROUND  *************************************************************************/

const canvasMenuBackgroundId = "menubackgroundLayer";
const canvasMenuBackground = document.getElementById(canvasMenuBackgroundId);





//metoda zajistujici responsivitu canvasu jako takoveho
//pozn. vsech 4 canvasu
const resizeCanvas = () => {
        let canvasArr = [canvasMenu, canvasMenuBackground];

        canvasArr.forEach( (c) => {
                c.width = window.innerWidth;
                c.height = window.innerHeight;
        })

        //musime i znovu nechat vykreslit hru popripade menu, zalezi na situaci
        menu.isMainMenuVisible ? ( menu.showMainMenu() , menu.showMainMenuBackground(canvasMenuBackground) ) : null;
}
//naslouchac, ktery po zmene velikosti stranky znovu pozmeni velikost canvasu
window.addEventListener('resize' , resizeCanvas);