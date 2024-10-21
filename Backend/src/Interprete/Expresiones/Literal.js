const {Expresion, TipoDato } = require('../Abstracto/Expresion.js');
const { errores } = require('../Errores/ListErrores.js');
const  Error = require('../Errores/Error.js');
const NodoArbol = require('../Simbolo/NodoArbol.js');

class Literal extends Expresion {
    constructor(valor, tipo, fila, columna) {
        super(valor, tipo, fila, columna);
        this.valor = valor;
        this.tipo = tipo;
    }

    ejecutar(entorno) {
        switch (this.tipo) {
            case TipoDato.ENTERO:
                this.valor = parseInt(this.valor);
                break;
            case TipoDato.DOUBLE:
                this.valor = parseFloat(this.valor);
                break;
            case TipoDato.CADENA:
                this.valor = this.valor;
                break;
            case TipoDato.CHAR:
                this.valor = this.valor;
                break;
            case TipoDato.BOOLEANO:
                if (this.valor === 'true') {
                    this.valor = true;
                } else {
                    this.valor = false;
                }
                break;
            default:
                errores.push(new Error('Semántico', 'Tipo de dato no válido', this.fila, this.columna));
                break;
        }
        return null;
    }

    getNodo(){
        let nodo = new NodoArbol("LITERAL");
        nodo.agregarHijo(this.valor);
        return nodo;
    }
}

module.exports = Literal;    