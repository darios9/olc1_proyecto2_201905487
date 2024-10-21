const {Expresion, TipoDato} = require("../Abstracto/Expresion.js");
const {errores} = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const NodoArbol = require("../Simbolo/NodoArbol.js");
const {Entorno} = require("../Simbolo/Entorno.js");
const Return = require("../Expresiones/Return.js");

class FunIs extends Expresion{
    constructor(tipo, exp, linea, columna){
        super(TipoDato.ERROR, tipo, linea, columna);
        this.exp = exp;
        this.tipo = tipo;
    }

    ejecutar(entorno){
        let valor = this.exp.ejecutar(entorno);

        if(this.exp == null){
            errores.push(new Error('Semántico', 'No se puede realizar la operación de IS', this.linea, this.columna));
            return null;
        }

        if(this.tipo == this.exp.tipo){
            this.tipo = TipoDato.BOOLEANO;
            this.valor = true;
            return true;
        }else{
            this.tipo = TipoDato.BOOLEANO;
            this.valor = false;
            return false;
        }

    }

    getNodo(){
        let nodo = new NodoArbol("IS");
        nodo.agregarHijo("(");
        nodo.agregarHijo(this.tipo);
        nodo.agregarHijo(")");
        nodo.agregarHijoArbol(this.exp.getNodo());
        return nodo;
    }
}

module.exports = FunIs;