const {Expresion, TipoDato} = require('../Abstracto/Expresion.js');
const {errores} = require('../Errores/ListErrores.js');
const Error = require('../Errores/Error.js');
const NodoArbol = require('../Simbolo/NodoArbol.js');

class OpLogicos extends Expresion {
    constructor(izq, der, operador, fila, columna) {
        super(null, TipoDato.BOOLEANO, der, fila, columna);
        this.izq = izq;
        this.der = der;
        this.operador = operador;
    }

    ejecutar(entorno) {
        
        if(this.izq != null){
            let izq = this.izq.ejecutar(entorno);
        }
        let der = this.der.ejecutar(entorno);
       if (this.izq != null) {
            if (this.izq.tipo === TipoDato.BOOLEANO && this.der.tipo === TipoDato.BOOLEANO) {
                switch (this.operador) {
                    case "&&":
                        this.valor = this.izq.valor && this.der.valor;
                        break;
                    case "||":
                        this.valor = this.izq.valor || this.der.valor;
                        break;
                }
                return this.valor;
            } else {
                errores.push(new Error('Semántico', 'Error de tipos en operación lógica', this.fila, this.columna));
            }
        }else if(this.izq == null){
            if (this.der.tipo === TipoDato.BOOLEANO) {
                switch (this.operador) {

                    case "!":
                        this.valor = !this.der.valor;
                        break;
                }
                return this.valor;
            } else {
                errores.push(new Error('Semántico', 'Error de tipos en operación lógica', this.fila, this.columna));
            }
        }
        return null;
    }

    getNodo() {
        let nodo = new NodoArbol("LOGICO");
        nodo.agregarHijoArbol(this.izq.getNodo());
        nodo.agregarHijo(this.operador);
        nodo.agregarHijoArbol(this.der.getNodo());
        return nodo;
    }
}

module.exports = OpLogicos;