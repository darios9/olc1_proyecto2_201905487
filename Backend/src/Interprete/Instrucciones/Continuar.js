const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const {errores} = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const NodoArbol = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");
const Break = require("./Break.js");

class Continuar extends Instruccion{
    constructor(linea, columna){
        super(TipoInstr.CONTINUAR, linea, columna);
    }

    ejecutar(entorno){
        return this;
    }

    getNodo(){
        let nodo = new NodoArbol("CONTINUAR");
        return nodo;
    }
}

module.exports = Continuar;