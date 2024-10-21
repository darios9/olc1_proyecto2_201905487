const { Expresion, TipoDato } = require("../Abstracto/Expresion.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const NodoArbol = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");

class Return extends Expresion{
    constructor(valorExp, linea, columna){
        super(valorExp, TipoDato.NULO, linea, columna);
        this.valorExp = valorExp;
    }

    ejecutar(entorno){
        if(this.valorExp != undefined ){
            this.valorExp.ejecutar(entorno);
            return this.valorExp.valor;
        }
        return this.valorExp;
    }


    getNodo(){
        let nodo = new NodoArbol("RETURN");
        if(this.valorExp != undefined){
            nodo.agregarHijoArbol(this.valorExp.getNodo());
        }
        return nodo;
    }
}

module.exports = Return;