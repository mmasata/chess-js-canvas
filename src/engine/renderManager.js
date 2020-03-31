export class RenderManager{

        constructor(config, game){
                this.config = config;
                this.game = game;

                //nastavi canvas sirku a vysku
                //kdyz je hodnota full, pak pridame naslouchace aby reagoval na zmenu velikosti
                let canvas = document.getElementById(config.canvas);
                if((config.width === 'full') && (config.height === 'full')){
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;
                        let self = this;
                        window.addEventListener('resize', ()=>{
                                canvas.width = window.innerWidth;
                                canvas.height = window.innerHeight;
                                //console.log('Velikost canvasu aktualizována');
                        });
                        //console.log('Canvas nastaven na fullScreen a s responzivitou');
                }
                else {
                        canvas.width = config.width;
                        canvas.height = config.height;
                        canvas.style.border = '1px solid black';
                        //console.log('Canvasu bylo fixně nastaveno '+config.width+'x'+config.height);
                };


                //naslouchac na pozicovani mysi
                this.mouseMoveActiveComponent = null;
                canvas.addEventListener('mousemove' , (e)=>{
                        //drag and drop
                        if(this.draggingComponent != null){
                                this._dragAndDrop(e, this.draggingComponent);
                                return;
                        };

                        //TODO kdyz je neco v resultComponents a mouseMoveActiveComponents ne, pak nastala mouseOver
                        //TODO kdyz je neco v resultComponents a taky v mouseMoveActiveComponents, pak nic neneastalo
                        //TODO kdyz neco neni v resultComponents a v mouseMoveActiveComponents je, pak nastava mouseOut
                });

                //naslouchac na klikani mysi
                canvas.addEventListener('click', (e)=>{
                        let resultComponent = this._getMouseActiveComponent(e);
                        //zavola metodu klik dane komponenty, bude zavolana posledni komponenta, protoze podle razeni prave ta je v nejvyssi vrstve a nejvyse
                        if(resultComponent){
                                resultComponent.onClick();
                        }
                });

                //naslouchac na stisknuti mysi a drzeni... slouzi pro drag and drop
                this.draggingStartX = null;
                this.draggingStartY = null;
                this.draggingComponent = null;
                canvas.addEventListener('mousedown', (e)=>{
                        let resultComponent = this._getMouseActiveComponent(e);
                        if(resultComponent.config.dragAndDrop){
                                this.draggingComponent = resultComponent;
                                this.draggingStartX = e.clientX - canvas.getBoundingClientRect().left;
                                this.draggingStartY = e.clientY - canvas.getBoundingClientRect().top;
                            } 
                });

                //naslouchac na odmacknuti tlacitka mysi... prenastavi promennou isDragging vsem komponentam na false
                canvas.addEventListener('mouseup' , (e)=>{
                        this.draggingStartX = null;
                        this.draggingStartY = null;
                        this.draggingComponent = null;
                });

                //refreshovani hry, defaultne nastaveno na 30fps
                setInterval( ()=> {
                        this.redraw();
                     }, 1000/60);
        }


        //vycisti canvas
        clear(){
                let canvas = document.getElementById(this.config.canvas);
                let ctx = canvas.getContext('2d');
                ctx.clearRect(0,0,canvas.width,canvas.height);
                //console.log('Canvas byl vyčistěn');
        }

        //prekresli canvas
        redraw(){ 
                this.clear(); 
                let mainCanvas = document.getElementById(this.config.canvas);
                let mainCtx = mainCanvas.getContext('2d');
                let layersArr = this.game.getAllLayers();
                for(let layer of layersArr){
                        let canvas = document.createElement("CANVAS");
                        canvas.width = mainCanvas.width;
                        canvas.height = mainCanvas.height;
                        let ctx = canvas.getContext('2d');
                        for(let component of layer.getComponents()){
                                let config = component.getConfig();
                                this._drawComponent(ctx, config);
                                //console.log('Vykresluji komponentu "'+config.name+'" do vrstvy "'+layer.getName()+'"');
                        }
                        mainCtx.drawImage(canvas, 0,0);
                }
        }


        //dokaze transofrmovat kongirurat komponenty do ciselnych hodnot
        _calculateComponentConfigValue(value){
                if(Number.isNaN(Number(value))){
                        let canvas = document.getElementById(this.config.canvas);
                        let CW = canvas.width;
                        let CH = canvas.height;
                        return eval(value);
                }
                else {
                        return Number(value);
                }
        }

        //vykresli danou komponentu do kontextu
        _drawComponent(ctx, config){
                let x = this._calculateComponentConfigValue(config.x);
                let y = this._calculateComponentConfigValue(config.y);
                let w = this._calculateComponentConfigValue(config.w);
                let h = this._calculateComponentConfigValue(config.h);

                ctx.beginPath();
                ctx.fillStyle= config.color;

                //typ geometrickeho objektu
                if(config.object === 'rect'){
                        ctx.rect(x,y,w,h);
                }
                //TODO ostatni typu geo objektu
                else if(config.object === 'ellipse'){
                        ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
                }

                //pridani do kontextu
               ctx.fill();

        }

        //vracim prvni komponentu na kteoru narazim
        //jelikoz iteruji odzadu, pak je to prave ta nejprednejsi
        _getMouseActiveComponent(e){
                let canvas = document.getElementById(this.config.canvas);
                let mouseX = e.clientX - canvas.getBoundingClientRect().left;
                let mouseY = e.clientY - canvas.getBoundingClientRect().top;
                let layers = this.game.getAllLayers();

                for(let i=(layers.length-1); i>-1; i--){
                        let components = layers[i].getComponents();
                        for(let z=(components.length-1); z>-1; z--){
                                let config = components[z].getConfig();
                                let x = this._calculateComponentConfigValue(config.x);
                                let y = this._calculateComponentConfigValue(config.y);
                                let w = this._calculateComponentConfigValue(config.w);
                                let h = this._calculateComponentConfigValue(config.h);
                                if ((mouseX >= x) && (mouseX <= w + x)) {
                                        if ((mouseY >= y) && (mouseY <= h + y)) {
                                                return components[z];
                                        }
                                }     
                        }
                }
                return null;
        }

        //vraci vsechny komponenty ve vsech vrstvach
        _getAllGamecomponents(){
                let resultComponents = [];
                for(let layer of this.game.getAllLayers()){
                        for(let component of layer.getComponents()){
                                resultComponents.push(component);
                        }
                }
                return resultComponents;     
        }

        //metoda zajistujici drag and drop komponent
        _dragAndDrop(e, component){
                let canvas = document.getElementById(this.config.canvas);
                //ziskame aktualni pozici mysi
                let currentX = e.clientX - canvas.getBoundingClientRect().left;
                let currentY = e.clientY - canvas.getBoundingClientRect().top;

                //TODO pridavaji se furt stringy, je treba vylepsit v pripade pouziti CW, CH u komponenty
                component.getConfig().x +='+' + (currentX - this.draggingStartX);
                component.getConfig().y += '+' + (currentY - this.draggingStartY);

                this.draggingStartX = currentX;
                this.draggingStartY = currentY;            
        }
}