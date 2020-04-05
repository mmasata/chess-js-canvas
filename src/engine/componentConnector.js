export class componentConnector{

        //konektor sdruzuje vice komponent do jedne
        //slouzi pro spojeni pri tvorbe slozitejsich obrazku pomoci vice objektu, aby fungoval spolecny klik, dragAndDrop, ...
        constructor(){
                this.components = [];
        }

        //metoda pridavajici komponentu do konektoru
        addComponent(component){
                this.components.push(component);
        }

        //metoda odstranujici komponentu z konektoru
        removeComponent(component){
                for(let i=0; i<this.components.length; i++){
                        if(this.components[i] === component){
                                this.components.splice(i, 1);
                                return;
                        }
                }
        }

        //odstrani vsechny komponenty z konektoru
        removeAllComponents(){
                this.components = [];
        }

        //vraci seznam komponent
        getComponents(){
                return this.components;
        }

}