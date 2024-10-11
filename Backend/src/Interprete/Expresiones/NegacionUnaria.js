const { Expresion, TipoDato } = require("../Abstracto/Expresion");
const { errores } = require("../Errores/ListErrores");
const { Error } = require("../Errores/Error");
const { NodoArbol } = require("../Simbolo/NodoArbol");

class NegacionUnaria extends Expresion{
    constructor(negacion, exp, linea, columna){
        super("ERROR", TipoDato.ERROR, linea, columna);
        this.negacion = negacion;
        this.exp = exp;
        this.linea; 
        this.columna;
    }

    ejecutar(entorno){
        let valor = this.exp.ejecutar(entorno);
        if(valor.tipo != TipoDato.BOOLEANO){
            errores.push(new Error('Semántico', 'Tipo de dato no válido', this.linea, this.columna));
            return null;
        }
        if(this.negacion){
            return !valor.valor;
        }
        return valor.valor;

    }

    getNodo(){
        let nodo = new NodoArbol("NEGACION");
        nodo.agregarHijo("!");
        nodo.agregarHijo(this.exp.getNodo());
        return nodo;
    }
}

module.exports = NegacionUnaria;