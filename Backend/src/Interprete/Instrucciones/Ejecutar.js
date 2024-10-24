const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const {errores} = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const NodoArbol  = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");
const Return = require('../Expresiones/Return.js');
const Call = require('../Expresiones/Call.js');

class Ejecutar extends Instruccion{
    constructor(Call, linea, columna){
        super(TipoInstr.EJECUTAR, linea, columna);
        this.Call = Call;
    }

    ejecutar(entorno){
        this.Call.ejecutar(entorno);
    }

    getNodo(){
        let nodo = new NodoArbol("EJECUTAR");
        nodo.agregarHijo(this.Call.getNodo());
        return nodo;
    }
}

module.exports = Ejecutar;
