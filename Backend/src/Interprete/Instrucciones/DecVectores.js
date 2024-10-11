const { Instruccion, TipoInstr } = require("../Abstracto/Instrucciones.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const { NodoArbol } = require("../Simbolo/NodoArbol.js");
const SimVector = require("../Simbolo/SimVector.js");

class DecVectores extends Instruccion {
  constructor(id, tipo, linea, columna, ...exp) {
    super(TipoInstr.DECLARAR, linea, columna);
    this.id = id[0];
    this.tipo = tipo;
    if (exp.length === 1 && !Array.isArray(exp[0])) {
      this.data = exp[0];
    } else if (exp.length === 2) {
      // Dos datos
      this.data1 = exp[0];
      this.data2 = exp[1];
    } else if (exp.length === 1 && Array.isArray(exp[0])) {
      if (exp[0].every(Array.isArray)) {
        // Lista de listas
        this.listaDeListas = exp[0];
      } else {
        // Lista simple
        this.lista = exp[0];
      }
    } else {
      errores.push(
        new Error(
          "Semántico",
          "Error en la declaración de vectores",
          this.linea,
          this.columna
        )
      );
    }
  }

  ejecutar(entorno) {
    if (this.data !== undefined) {
      let ej = this.data.ejecutar(entorno);
      let num = this.data.valor;
      let vector = entorno.buscarVector(this.id);
      if (vector) {
        errores.push(
          new Error(
            "Semántico",
            `El vector ${this.id} ya existe`,
            this.linea,
            this.columna
          )
        );
        return null;
      }
      // crear un vector con un vector de tamaño definido
      let valores = new Array(num).fill(null);
      entorno.guardarVector(this.id, this.tipo, valores, this.linea, this.columna);
    } else if (this.data1 !== undefined && this.data2 !== undefined) {
      let ej1 = this.data1.ejecutar(entorno);
      let ej2 = this.data2.ejecutar(entorno);
      let fila = this.data1.valor;
      let columna = this.data2.valor;
      let vecNuevo = new Array(fila);
      let vector = entorno.buscarVector(this.id);
      if (vector) {
        errores.push(
          new Error(
            "Semántico",
            `El vector ${this.id} ya existe`,
            this.linea,
            this.columna
          )
        );
        return null;
      }
      // crear un vector con un rango de valores definido
      for (let i = 0; i < fila; i++) {
        vecNuevo[i] = new Array(columna).fill(null);
      }
      entorno.guardarVector(this.id, this.tipo, vecNuevo, this.linea, this.columna);
    } else if (this.lista !== undefined) {
      let vector = entorno.buscarVector(this.id);
      if (vector) {
        errores.push(
          new Error(
            "Semántico",
            `El vector ${this.id} ya existe`,
            this.linea,
            this.columna
          )
        );
        return null;
      }
      // crear un vector con una lista de valores
      let listaNueva = [];
      for (let i = 0; i < this.lista.length; i++) {
        this.lista[i].ejecutar(entorno);
        let valor = this.lista[i].valor;
        listaNueva.push(valor)
      }

      entorno.guardarVector(this.id, this.tipo, listaNueva, this.linea, this.columna);
    } else if (this.listaDeListas !== undefined) {
      let vector = entorno.buscarVector(this.id);
      if (vector) {
        errores.push(
          new Error(
            "Semántico",
            `El vector ${this.id} ya existe`,
            this.linea,
            this.columna
          )
        );
        return null;
      }
      // crear un vector con una lista de listas
        let listaDeListas = [];
        for (let i = 0; i < this.listaDeListas.length; i++) {
          let lista = this.listaDeListas[i];
          let listaNueva = [];
          for (let j = 0; j < lista.length; j++) {
            lista[j].ejecutar(entorno);
            let valor = lista[j].valor;
            listaNueva.push(valor);
          }
          listaDeListas.push(listaNueva);
        }
        entorno.guardarVector( this.id, this.tipo, listaDeListas, this.linea, this.columna);
    } else {
      errores.push(
        new Error(
          "Semántico",
          "Error en la declaración de vectores",
          this.linea,
          this.columna
        )
      );
    }

    return null;
  }

    getNodo() {
        let nodo = new NodoArbol("DECLARAR VECTOR");
        nodo.agregarHijo(this.tipo);
        nodo.agregarHijo(this.id);
        if (this.data !== undefined) {
        let nodoData = new NodoArbol("TAMAÑO");
        nodoData.agregarHijo(this.data.getNodo());
        nodo.agregarHijo(nodoData);
        } else if (this.data1 !== undefined && this.data2 !== undefined) {
        let nodoData1 = new NodoArbol("FILA");
        nodoData1.agregarHijo(this.data1.getNodo());
        nodo.agregarHijo(nodoData1);
        let nodoData2 = new NodoArbol("COLUMNA");
        nodoData2.agregarHijo(this.data2.getNodo());
        nodo.agregarHijo(nodoData2);
        } else if (this.lista !== undefined) {
        let nodoData = new NodoArbol("VALORES");
        nodoData.agregarHijo(this.lista.getNodo());
        nodo.agregarHijo(nodoData);
        } else if (this.listaDeListas !== undefined) {
        let nodoData = new NodoArbol("VALORES");
        nodoData.agregarHijo(this.listaDeListas.getNodo());
        nodo.agregarHijo(nodoData);
        }
        return nodo;
    }
}

module.exports = DecVectores;