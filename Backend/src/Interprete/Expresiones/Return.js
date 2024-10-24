const { Expresion, TipoDato } = require("../Abstracto/Expresion.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const NodoArbol = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");

class Return extends Expresion{
    constructor(valorExp, linea, columna){
        super(null, TipoDato.NULO, linea, columna);
        this.valorExp = valorExp;
    }

    ejecutar(entorno){
        if(this.valorExp != undefined ){
            this.valorExp.ejecutar(entorno);
            this.tipo = this.valorExp.tipo;
            this.valor = this.valorExp.valor;
            return this;
        }
        return this;
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