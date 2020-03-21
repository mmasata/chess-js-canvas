import { Menu } from './menu/menu.js';
import { MenuBackground } from './menu/backgroundMenu.js';


const menuBackground = new MenuBackground();
const menu = new Menu();
//naslouchac na spousteci tlacitko
//vyvola hlavni menu, a spusti hlavni hudbu
document.getElementById("init").addEventListener('click' , function(){
        resizeCanvases();
        menu.drawPartOfMenu('mainMenu');
        menu.playThemeSong();
        menuBackground.draw();
        document.getElementById("modal").style.display = "none";
})

//vsechny 4 canvasy bude prizpusobovat velikosti obrazovky uzivatele
const resizeCanvases = () => {
        let canvasIds = ['gameLayer' , 'gameBackgroundLayer' , 'menuLayer' , 'menubackgroundLayer'];
        canvasIds.forEach((id) =>{
                let canvas = document.getElementById(id);
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
        });
        if(menu.isVisible()){
                //menu things
                menu.redrawResizedCurrentMenuSection();
        }
        else {
                //game things
        }
};
//naslouchac reagujici na zmenu velikosti obrazovky
window.addEventListener('resize' , resizeCanvases);
