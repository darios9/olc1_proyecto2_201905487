const { Instruccion, TipoInstr } = require("../Abstracto/Instrucciones.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const NodoArbol = require("../Simbolo/NodoArbol.js");
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
        return ;
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
    let nodo = new NodoArbol("DECLARACION VECTOR");
    nodo.agregarHijo("let");
    nodo.agregarHijo(this.id);
    nodo.agregarHijo(":");
    nodo.agregarHijo(this.tipo);
    if (this.data !== undefined) {
      nodo.agregarHijo("=");
      nodo.agregarHijoArbol(this.data.getNodo());
    } else if (this.data1 !== undefined && this.data2 !== undefined) {
      nodo.agregarHijo("=");
      nodo.agregarHijo("[");
      nodo.agregarHijoArbol(this.data1.getNodo());
      nodo.agregarHijo(",");
      nodo.agregarHijoArbol(this.data2.getNodo());
      nodo.agregarHijo("]");
    } else if (this.lista !== undefined) {
      nodo.agregarHijo("=");
      nodo.agregarHijo("[");
      for (let i = 0; i < this.lista.length; i++) {
        nodo.agregarHijoArbol(this.lista[i].getNodo());
        if (i < this.lista.length - 1) {
          nodo.agregarHijo(",");
        }
      }
      nodo.agregarHijo("]");
    } else if (this.listaDeListas !== undefined) {
      nodo.agregarHijo("=");
      nodo.agregarHijo("[");
      for (let i = 0; i < this.listaDeListas.length; i++) {
        nodo.agregarHijo("[");
        for (let j = 0; j < this.listaDeListas[i].length; j++) {
          nodo.agregarHijoArbol(this.listaDeListas[i][j].getNodo());
          if (j < this.listaDeListas[i].length - 1) {
            nodo.agregarHijo(",");
          }
        }
        nodo.agregarHijo("]");
        if (i < this.listaDeListas.length - 1) {
          nodo.agregarHijo(",");
        }
      }
      nodo.agregarHijo("]");
    }
    return nodo;
  }
}

module.exports = DecVectores;