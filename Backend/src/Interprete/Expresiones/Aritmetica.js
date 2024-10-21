const { Expresion, TipoDato } = require("../Abstracto/Expresion");
const { errores } = require("../Errores/ListErrores");
const Error  = require("../Errores/Error");
const NodoArbol = require("../Simbolo/NodoArbol");

class Aritmetica extends Expresion {
  constructor(op1, operador, op2, fila, columna) {
    super("NULL", TipoDato.ERROR, fila, columna);
    this.op1 = op1;
    this.operador = operador;
    this.op2 = op2;
  }

  ejecutar(entorno) {
    let valor1 = this.op1.ejecutar(entorno);
    let valor2 = this.op2.ejecutar(entorno);

    if (this.op1.tipo === TipoDato.ERROR || this.op2.tipo === TipoDato.ERROR) {
        errores.push(new Error('Semántico', 'Error en la operación aritmética', this.fila, this.columna));
      return this;
    }

    switch (this.operador) {
      case "+":
        if (
          this.op1.tipo === TipoDato.ENTERO &&
          this.op2.tipo === TipoDato.ENTERO
        ) {
          this.tipo = TipoDato.ENTERO;
          this.valor = this.op1.valor + this.op2.valor;
        } else if (
          this.op1.tipo === TipoDato.ENTERO &&
          this.op2.tipo === TipoDato.DOUBLE
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor + this.op2.valor;
        }else if (this.op1.tipo === TipoDato.ENTERO && this.op2.tipo === TipoDato.BOOLEANO) {
            this.tipo = TipoDato.ENTERO;
            this.valor = this.op1.valor + (this.op2.valor ? 1 : 0);
        }else if(this.op1.tipo === TipoDato.ENTERO && this.op2.tipo === TipoDato.CHAR){
            this.tipo = TipoDato.ENTERO;
            this.valor = this.op1.valor + this.op2.valor.charCodeAt(0);
        }else if(this.op1.tipo === TipoDato.ENTERO && this.op2.tipo === TipoDato.CADENA){
            this.tipo = TipoDato.CADENA;
            this.valor = this.op1.valor + this.op2.valor;;
        }else if (
          this.op1.tipo === TipoDato.DOUBLE &&
          this.op2.tipo === TipoDato.ENTERO
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor + this.op2.valor;
        } else if (
          this.op1.tipo === TipoDato.DOUBLE &&
          this.op2.tipo === TipoDato.DOUBLE
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor + this.op2.valor;
        }else if(this.op1.tipo === TipoDato.DOUBLE && this.op2.tipo === TipoDato.BOOLEANO){
            this.tipo = TipoDato.DOUBLE;
            this.valor = this.op1.valor + (this.op2.valor ? 1 : 0);
        }else if(this.op1.tipo === TipoDato.DOUBLE && this.op2.tipo === TipoDato.CHAR){
            this.tipo = TipoDato.DOUBLE;
            this.valor = this.op1.valor + this.op2.valor.charCodeAt(0);
        }else if(this.op1.tipo === TipoDato.DOUBLE && this.op2.tipo === TipoDato.CADENA){
            this.tipo = TipoDato.CADENA;
            this.valor = this.op1.valor + this.op2.valor;;
        }else if(this.op1.tipo === TipoDato.BOOLEANO && this.op2.tipo === TipoDato.ENTERO){
            this.tipo = TipoDato.ENTERO;
            this.valor = (this.op1.valor ? 1 : 0) + this.op2.valor;
        }else if(this.op1.tipo === TipoDato.BOOLEANO && this.op2.tipo === TipoDato.DOUBLE){
            this.tipo = TipoDato.DOUBLE;
            this.valor = (this.op1.valor ? 1 : 0) + this.op2.valor;
        }else if(this.op1.tipo == TipoDato.BOOLEANO && this.op2.tipo == TipoDato.CADENA){
            this.tipo = TipoDato.CADENA;
            this.valor = (this.op1.valor ? "true" : "false") + this.op2.valor;
        }else if(this.op1.tipo === TipoDato.CHAR && this.op2.tipo === TipoDato.ENTERO){
            this.tipo = TipoDato.ENTERO;
            this.valor = this.op1.valor.charCodeAt(0) + this.op2.valor;
        }else if(this.op1.tipo === TipoDato.CHAR && this.op2.tipo === TipoDato.DOUBLE){
            this.tipo = TipoDato.DOUBLE;
            this.valor = this.op1.valor.charCodeAt(0) + this.op2.valor;
        }else if(this.op1.tipo === TipoDato.CHAR && this.op2.tipo === TipoDato.CHAR){
            this.tipo = TipoDato.CADENA;
            this.valor = this.op1.valor + this.op2.valor;
        }else if(this.op1.tipo === TipoDato.CHAR && this.op2.tipo === TipoDato.CADENA){
            this.tipo = TipoDato.CADENA;
            this.valor = this.op1.valor + this.op2.valor;
        }else if(this.op1.tipo === TipoDato.CADENA && this.op2.tipo === TipoDato.CADENA){
            this.tipo = TipoDato.CADENA;
            this.valor = this.op1.valor + this.op2.valor;
        }else if(this.op1.tipo === TipoDato.CADENA && this.op2.tipo === TipoDato.ENTERO){
            this.tipo = TipoDato.CADENA;
            this.valor = this.op1.valor + this.op2.valor;
        }else if(this.op1.tipo === TipoDato.CADENA && this.op2.tipo === TipoDato.DOUBLE){
            this.tipo = TipoDato.CADENA;
            this.valor = this.op1.valor + this.op2.valor;
        }else if(this.op1.tipo === TipoDato.CADENA && this.op2.tipo === TipoDato.BOOLEANO){
            this.tipo = TipoDato.CADENA;
            this.valor = this.op1.valor + (this.op2.valor ? "true" : "false");
        }else if(this.op1.tipo === TipoDato.CADENA && this.op2.tipo === TipoDato.CHAR){
            this.tipo = TipoDato.CADENA;
            this.valor = this.op1.valor + this.op2.valor;
        }else if (
          this.op1.tipo === TipoDato.CADENA &&
          this.op2.tipo === TipoDato.CADENA
        ) {
          this.tipo = TipoDato.CADENA;
          this.valor = this.op1.valor + this.op2.valor;
        } else {
          errores.push(
            new Error(
              "Semántico",
              "No se pueden sumar los tipos de datos",
              this.fila,
              this.columna
            )
          );
          this.tipo = TipoDato.ERROR;
          this.valor = "Error";
        }
        break;
      case "-":
        if (
          this.op1.tipo === TipoDato.ENTERO &&
          this.op2.tipo === TipoDato.ENTERO
        ) {
          this.tipo = TipoDato.ENTERO;
          this.valor = this.op1.valor - this.op2.valor;
        } else if (
          this.op1.tipo === TipoDato.ENTERO &&
          this.op2.tipo === TipoDato.DOUBLE
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor - this.op2.valor;
        }else if(this.op1.tipo === TipoDato.ENTERO && this.op2.tipo === TipoDato.BOOLEANO){
            this.tipo = TipoDato.ENTERO;
            this.valor = this.op1.valor - (this.op2.valor ? 1 : 0);
        }else if(this.op1.tipo === TipoDato.ENTERO && this.op2.tipo === TipoDato.CHAR){
            this.tipo = TipoDato.ENTERO;
            this.valor = this.op1.valor - this.op2.valor.charCodeAt(0);
        }else if (
          this.op1.tipo === TipoDato.DOUBLE &&
          this.op2.tipo === TipoDato.ENTERO
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor - this.op2.valor;
        } else if (
          this.op1.tipo === TipoDato.DOUBLE &&
          this.op2.tipo === TipoDato.DOUBLE
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor - this.op2.valor;
        }else if(this.op1.tipo === TipoDato.DOUBLE && this.op2.tipo === TipoDato.BOOLEANO){
            this.tipo = TipoDato.DOUBLE;
            this.valor = this.op1.valor - (this.op2.valor ? 1 : 0);
        }else if(this.op1.tipo === TipoDato.DOUBLE && this.op2.tipo === TipoDato.CHAR){
            this.tipo = TipoDato.DOUBLE;
            this.valor = this.op1.valor - this.op2.valor.charCodeAt(0);
        }else if(this.op1.tipo === TipoDato.BOOLEANO && this.op2.tipo === TipoDato.ENTERO){
            this.tipo = TipoDato.ENTERO;
            this.valor = (this.op1.valor ? 1 : 0) - this.op2.valor;;
        }else if(this.op1.tipo === TipoDato.BOOLEANO && this.op2.tipo === TipoDato.DOUBLE){
            this.tipo = TipoDato.DOUBLE;
            this.valor = (this.op1.valor ? 1 : 0) - this.op2.valor;;
        }else if(this.op1.tipo === TipoDato.CHAR && this.op2.tipo === TipoDato.ENTERO){
            this.tipo = TipoDato.ENTERO;
            this.valor = this.op1.valor.charCodeAt(0) - this.op2.valor;;
        }else if(this.op1.tipo === TipoDato.CHAR && this.op2.tipo === TipoDato.DOUBLE){
            this.tipo = TipoDato.DOUBLE;
            this.valor = this.op1.valor.charCodeAt(0) - this.op2.valor;;
        }
         else {
          errores.push(
            new Error(
              "Semántico",
              "No se pueden restar los tipos de datos",
              this.fila,
              this.columna
            )
          );
          this.tipo = TipoDato.ERROR;
          this.valor = "Error";
        }
        break;
      case "*":
        if (
          this.op1.tipo === TipoDato.ENTERO &&
          this.op2.tipo === TipoDato.ENTERO
        ) {
          this.tipo = TipoDato.ENTERO;
          this.valor = this.op1.valor * this.op2.valor;
        } else if (
          this.op1.tipo === TipoDato.ENTERO &&
          this.op2.tipo === TipoDato.DOUBLE
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor * this.op2.valor;
        }else if(this.op1.tipo === TipoDato.ENTERO && this.op2.tipo === TipoDato.CHAR){
            this.tipo = TipoDato.ENTERO;
            this.valor = this.op1.valor * this.op2.valor.charCodeAt(0);
        }else if (
          this.op1.tipo === TipoDato.DOUBLE &&
          this.op2.tipo === TipoDato.ENTERO
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor * this.op2.valor;
        } else if (
          this.op1.tipo === TipoDato.DOUBLE &&
          this.op2.tipo === TipoDato.DOUBLE
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor * this.op2.valor;
        }else if(this.op1.tipo === TipoDato.DOUBLE && this.op2.tipo === TipoDato.CHAR){
            this.tipo = TipoDato.DOUBLE;
            this.valor = this.op1.valor * this.op2.valor.charCodeAt(0);
        }else if(this.op1.tipo === TipoDato.CHAR && this.op2.tipo === TipoDato.ENTERO){
            this.tipo = TipoDato.ENTERO;
            this.valor = this.op1.valor.charCodeAt(0) * this.op2.valor;;
        }else if(this.op1.tipo === TipoDato.CHAR && this.op2.tipo === TipoDato.DOUBLE){
            this.tipo = TipoDato.DOUBLE;
            this.valor = this.op1.valor.charCodeAt(0) * this.op2.valor;;
        }else {
          errores.push(
            new Error(
              "Semántico",
              "No se pueden multiplicar los tipos de datos",
              this.fila,
              this.columna
            )
          );
          this.tipo = TipoDato.ERROR;
          this.valor = "Error";
        }
        break;
      case "/":
        if (
          this.op1.tipo === TipoDato.ENTERO &&
          this.op2.tipo === TipoDato.ENTERO
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor / this.op2.valor;
        } else if (
          this.op1.tipo === TipoDato.ENTERO &&
          this.op2.tipo === TipoDato.DOUBLE
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor / this.op2.valor;
        }else if(this.op1.tipo === TipoDato.ENTERO && this.op2.tipo === TipoDato.CHAR){
            this.tipo = TipoDato.DOUBLE;
            this.valor = this.op1.valor / this.op2.valor.charCodeAt(0);
        }else if (
          this.op1.tipo === TipoDato.DOUBLE &&
          this.op2.tipo === TipoDato.ENTERO
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor / this.op2.valor;
        } else if (
          this.op1.tipo === TipoDato.DOUBLE &&
          this.op2.tipo === TipoDato.DOUBLE
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor / this.op2.valor;
        }else if(this.op1.tipo === TipoDato.DOUBLE && this.op2.tipo === TipoDato.CHAR){
            this.tipo = TipoDato.DOUBLE;
            this.valor = this.op1.valor / this.op2.valor.charCodeAt(0);
        }else if(this.op1.tipo === TipoDato.CHAR && this.op2.tipo === TipoDato.ENTERO){
            this.tipo = TipoDato.DOUBLE;
            this.valor = this.op1.valor.charCodeAt(0) / this.op2.valor;;
        }else if(this.op1.tipo === TipoDato.CHAR && this.op2.tipo === TipoDato.DOUBLE){
            this.tipo = TipoDato.DOUBLE;
            this.valor = this.op1.valor.charCodeAt(0) / this.op2.valor;
        }
         else {
          errores.push(
            new Error(
              "Semántico",
              "No se pueden dividir los tipos de datos",
              this.fila,
              this.columna
            )
          );
          this.tipo = TipoDato.ERROR;
          this.valor = "Error";
        }
        break;
      case "%":
        if (
          this.op1.tipo === TipoDato.ENTERO &&
          this.op2.tipo === TipoDato.ENTERO
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor % this.op2.valor;
        }else if (
          this.op1.tipo === TipoDato.ENTERO &&
          this.op2.tipo === TipoDato.DOUBLE
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor % this.op2.valor;
        } else if (
          this.op1.tipo === TipoDato.DOUBLE &&
          this.op2.tipo === TipoDato.ENTERO
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor % this.op2.valor;
        } else if (
          this.op1.tipo === TipoDato.DOUBLE &&
          this.op2.tipo === TipoDato.DOUBLE
        ) {
          this.tipo = TipoDato.DOUBLE;
          this.valor = this.op1.valor % this.op2.valor;
        }else {
          errores.push(
            new Error(
              "Semántico",
              "No se pueden dividir los tipos de datos para obtener el módulo",
              this.fila,
              this.columna
            )
          );
          this.tipo = TipoDato.ERROR;
          this.valor = "Error";
        }
        break;
        case "$":
            if(this.op1.tipo === TipoDato.ENTERO && this.op2.tipo === TipoDato.ENTERO){
                this.tipo = TipoDato.DOUBLE;
                this.valor = Math.pow(this.op1.valor, this.op2.valor);
            }
            else if(this.op1.tipo === TipoDato.ENTERO && this.op2.tipo === TipoDato.DOUBLE){
                this.tipo = TipoDato.DOUBLE;
                this.valor = Math.pow(this.op1.valor, this.op2.valor);
            }
            else if(this.op1.tipo === TipoDato.DOUBLE && this.op2.tipo === TipoDato.ENTERO){
                this.tipo = TipoDato.DOUBLE;
                this.valor = Math.pow(this.op1.valor, this.op2.valor);
            }
            else if(this.op1.tipo === TipoDato.DOUBLE && this.op2.tipo === TipoDato.DOUBLE){
                this.tipo = TipoDato.DOUBLE;
                this.valor = Math.pow(this.op1.valor, this.op2.valor);
            }
            else{
                errores.push(new Error('Semántico', 'No se pueden elevar los tipos de datos', this.fila, this.columna));
                this.tipo = TipoDato.ERROR;
                this.valor = 'Error';
            }
        break;
        case "^":
                if(this.op1.tipo === TipoDato.ENTERO && this.op2.tipo === TipoDato.ENTERO){
                    this.tipo = TipoDato.ENTERO;
                    this.valor = this.op1.valor ** this.op2.valor;
                }
                else if(this.op1.tipo === TipoDato.ENTERO && this.op2.tipo === TipoDato.DOUBLE){
                    this.tipo = TipoDato.DOUBLE;
                    this.valor = this.op1.valor ** this.op2.valor;
                }
                else if(this.op1.tipo === TipoDato.DOUBLE && this.op2.tipo === TipoDato.ENTERO){
                    this.tipo = TipoDato.DOUBLE;
                    this.valor = this.op1.valor ** this.op2.valor;
                }
                else if(this.op1.tipo === TipoDato.DOUBLE && this.op2.tipo === TipoDato.DOUBLE){
                    this.tipo = TipoDato.DOUBLE;
                    this.valor = this.op1.valor ** this.op2.valor;
            }
            else{
                errores.push(new Error('Semántico', 'No se pueden dividir los tipos de datos', this.fila, this.columna));
                this.tipo = TipoDato.ERROR;
                this.valor = 'Error';
            }
            break;
        default:
            errores.push(new Error('Semántico', 'Operador no válido', this.fila, this.columna));
            this.tipo = TipoDato.ERROR;
            this.valor = 'Error';
            break;

    }
  }

    getNodo() {
        let nodo = new NodoArbol("ARITMETICA");
        nodo.agregarHijoArbol(this.op1.getNodo());
        nodo.agregarHijo(this.operador);
        nodo.agregarHijoArbol(this.op2.getNodo());
        return nodo;
    }

}

module.exports = Aritmetica;