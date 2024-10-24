const {Expresion, TipoDato } = require('../Abstracto/Expresion.js');
const { errores } = require('../Errores/ListErrores.js');
const  Error = require('../Errores/Error.js');
const  NodoArbol  = require('../Simbolo/NodoArbol.js');

class Acceso extends Expresion {
    constructor(id, fila, columna) {
        super(id, TipoDato.NULO, fila, columna);
        this.id = id;
    }
        
    ejecutar(entorno) {
        let variable = entorno.getVariable(this.id);
        let variableVector = entorno.getVector(this.id);
        if(variable){
           let nuevoValor =entorno.getVariable(this.id);
           this.tipo = nuevoValor.tipo;
           this.valor = nuevoValor.valor;
           return nuevoValor;

        }else if(variableVector){
            this.tipo = variableVector.tipo;
            this.valor = variableVector.valores;
            return this.valor;
        }else{
            this.valor = "Error; Variable no Declarada "+ "fila "+this.fila+" columna "+this.columna;
            errores.push(new Error('Semántico', 'Variable no encontrada', this.fila, this.columna));
        }
        return null;
    }

    getNodo() {
        let nodo = new NodoArbol("ACCESO");
        nodo.agregarHijo(this.valor);
        return nodo;
    }
}

module.exports = Acceso;