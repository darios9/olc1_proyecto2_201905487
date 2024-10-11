class NodoArbol {
    constructor(valor){
        this.valor = valor;
        this.ListHijos = [];
    }

    agregarHijo(hijo){
        this.ListHijos.push(hijo);
    }

    agregarHijoArbol(hijo){
        if(hijo !== undefined){
            this.ListHijos.push(hijo);
        }  
    }
}

module.exports = NodoArbol;