const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const { NodoArbol } = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");

class Break extends Instruccion {
    constructor(linea, columna) {
        super(TipoInstr.BREAK, linea, columna);
    }

    ejecutar(entorno) {
        return this;
    }

    getNodo() {
        let nodo = new NodoArbol("BREAK");
        return nodo;
    }
}

module.exports = Break;
