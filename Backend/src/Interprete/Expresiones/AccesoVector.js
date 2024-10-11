const { Expresion, TipoDato } = require('../Abstracto/Expresion.js');
const { errores } = require('../Errores/ListErrores.js');
const Error = require('../Errores/Error.js');
const { NodoArbol } = require('../Simbolo/NodoArbol.js');
const e = require('express');

class AccesoVector extends Expresion {
    constructor(id, exp, exp2, fila, columna) {
        super(id, null, fila, columna);
        this.id = id;
        this.exp = exp;
        this.exp2 = exp2;
    }

   ejecutar(entorno) {
        let vector = entorno.buscarVector(this.id);
        let vector2 = entorno.getVector(this.id);
        if(vector){
            if (this.exp === null && this.exp2 === null) {
                errores.push(new Error('Semántico', 'Se esperaba una expresión', this.fila, this.columna));
                return null;
            }
            if (this.exp2 === null) {
                let pos = this.exp.ejecutar(entorno);
                if (this.exp.tipo != TipoDato.ENTERO) {
                    errores.push(new Error('Semántico', 'Se esperaba un entero', this.fila, this.columna));
                    return null;
                }
                if (this.exp.valor < 0 || this.exp.valor >= vector2.valores.length) {
                    errores.push(new Error('Semántico', 'Indice fuera de rango', this.fila, this.columna));
                    return null;
                }
                this.valor = vector2.valores[this.exp.valor];
                return vector2.valores[this.exp.valor];
            } else {
                let pos1 = this.exp.ejecutar(entorno);
                let pos2 = this.exp2.ejecutar(entorno);
                if (this.exp.tipo != TipoDato.ENTERO || this.exp2.tipo != TipoDato.ENTERO) {
                    errores.push(new Error('Semántico', 'Se esperaba un entero', this.fila, this.columna));
                    return null;
                }
                if (this.exp.valor < 0 || this.exp.valor >= vector2.valores.length || this.exp2.valor < 0 || this.exp2.valor >= vector2.valores.length) {
                    errores.push(new Error('Semántico', 'Indice fuera de rango', this.fila, this.columna));
                    return null;
                }
                this.valor = vector2.valores[this.exp.valor][this.exp2.valor];
                return vector2.valores[this.exp.valor][this.exp2.valor];
            }
        }
    }

    getNodo() {
        let nodo = new NodoArbol("ACCESO VECTOR");
        nodo.agregarHijo(this.id);
        if (this.exp != null) {
            nodo.agregarHijo("[");
            nodo.agregarHijo(this.exp.getNodo());
            nodo.agregarHijo("]");
        }
        if (this.exp2 != null) {
            nodo.agregarHijo("[");
            nodo.agregarHijo(this.exp2.getNodo());
            nodo.agregarHijo("]");
        }
        return nodo;
    }
}

module.exports = AccesoVector;
