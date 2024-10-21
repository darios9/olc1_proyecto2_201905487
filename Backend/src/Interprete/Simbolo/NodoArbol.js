class NodoArbol {
    constructor(valor){
        this.valor = valor;
        this.listaHijos = [];
    }

    agregarHijo(hijo){
        this.listaHijos.push(new NodoArbol(hijo));
    }

    agregarHijoArbol(hijo){
        if(hijo !== undefined){
            this.listaHijos.push(hijo);
        }  
    }
}

module.exports = NodoArbol;