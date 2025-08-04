const { Expresion, TipoDato } = require("../Abstracto/Expresion");
const { errores } = require("../Errores/ListErrores");
const  Error  = require("../Errores/Error");
const NodoArbol = require("../Simbolo/NodoArbol");
const e = require("express");

class NegacionUnaria extends Expresion{
    constructor(negacion, exp, linea, columna){
        super("ERROR", TipoDato.ERROR, linea, columna);
        this.negacion = negacion;
        this.exp = exp;
    }

    ejecutar(entorno){
        let valor = this.exp.ejecutar(entorno);
        if(this.exp == null){
            errores.push(new Error('Semántico', 'Expresión no válida', this.linea, this.columna));
            return;
        } 
        
        switch(this.negacion){
            case "-":
                if(this.exp.tipo == TipoDato.ENTERO){
                    this.tipo = TipoDato.ENTERO;
                    this.valor = -this.exp.valor;
                    return this;
                }else if(this.exp.tipo == TipoDato.DOUBLE){
                    this.tipo = TipoDato.DOUBLE;
                    this.valor = -this.exp.valor;
                    return this;
                }else{
                    errores.push(new Error('Semántico', 'No se puede negar un valor no numérico', this.linea, this.columna));
                }
                break;
            default:
                errores.push(new Error('Semántico', 'Operador no válido', this.linea, this.columna));
        }

    }

    getNodo(){
        let nodo = new NodoArbol("NEGACION");
        nodo.agregarHijo("!");
        nodo.agregarHijoArbol(this.exp.getNodo());
        return nodo;
    }
}

module.exports = NegacionUnaria;