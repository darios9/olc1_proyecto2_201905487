const { Expresion, TipoDato } = require("../Abstracto/Expresion.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const { NodoArbol } = require("../Simbolo/NodoArbol.js");

class Ternario extends Expresion {
  constructor(condicion, expre1, expre2, fila, columna) {
    super(condicion, TipoDato.NULO, fila, columna);
    this.condicion = condicion;
    this.expre1 = expre1;
    this.expre2 = expre2;
  }

  ejecutar(entorno) {
    let condicion = this.condicion.ejecutar(entorno);
    let expre1 = this.expre1.ejecutar(entorno);
    let expre2 = this.expre2.ejecutar(entorno);
    console.log("Condicion en ternario: " + this.condicion.valor);
    if (this.condicion.tipo === TipoDato.BOOLEANO) {
      if (this.condicion.valor) {
        this.valor = this.expre1.valor;
        this.tipo = this.expre1.tipo;
        return this.expre1;
      } else {
        this.valor = this.expre2.valor;
        this.tipo = this.expre2.tipo;
        return this.expre2;
      }
    }
  }

    getNodo() {
        let nodo = new NodoArbol("TERNARIO");
        nodo.agregarHijo("?");
        nodo.agregarHijo(this.condicion.getNodo());
        nodo.agregarHijo(":");
        nodo.agregarHijo(this.expre1.getNodo());
        nodo.agregarHijo(this.expre2.getNodo());
        return nodo;
    }
}

module.exports = Ternario;
