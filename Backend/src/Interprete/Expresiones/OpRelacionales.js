const {Expresion, TipoDato } = require('../Abstracto/Expresion.js');
const { errores } = require('../Errores/ListErrores.js');
const  Error = require('../Errores/Error.js');
const NodoArbol = require('../Simbolo/NodoArbol.js');
const e = require('express');

class OpRelacioneles extends Expresion {
    constructor(izq, der, operador, fila, columna) {
        super(null, TipoDato.BOOLEANO, fila, columna);
        this.izq = izq;
        this.der = der;
        this.operador = operador;
    }

    ejecutar(entorno) {
        let izq = this.izq.ejecutar(entorno);
        let der = this.der.ejecutar(entorno);
       
        if (this.izq.tipo === TipoDato.ERROR || this.der.tipo === TipoDato.ERROR) {
            errores.push(new Error('Semántico', 'Error en la operación relacional', this.fila, this.columna));
            return null;
        }else if (this.izq === null || this.der === null) {
            errores.push(new Error('Semántico', 'Error en la operación relacional', this.fila, this.columna));
            return null;
        }

      
        switch (this.operador) {
            case "==":
                if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor === this.der.valor.charCodeAt(0);
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.CHAR){
                    this.valor = Number(this.izq.valor) === Number(this.der.valor.charCodeAt(0));
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor.charCodeAt(0) === this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.CADENA && this.der.tipo === TipoDato.CADENA){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.CADENA && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.CADENA){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.BOOLEANO){
                    this.valor = this.izq.valor === this.der.valor;
                }else if(this.izq.tipo === TipoDato.BOOLEANO && this.der.tipo === TipoDato.BOOLEANO){
                    this.valor = this.izq.valor === this.der.valor;

                }else if(this.izq.tipo === TipoDato.BOOLEANO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor === this.der.valor;
                }else {
                    errores.push(new Error('Semántico', 'Error en la operación relacional', this.fila, this.columna));
                    return null;
                }
                break;
            case "!=":
                if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor !== this.der.valor.charCodeAt(0);
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor.charCodeAt(0) !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor.charCodeAt(0) !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.CADENA && this.der.tipo === TipoDato.CADENA){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.CADENA && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.CHAR){   
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.CADENA){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.BOOLEANO){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.BOOLEANO && this.der.tipo === TipoDato.BOOLEANO){
                    this.valor = this.izq.valor !== this.der.valor;
                }else if(this.izq.tipo === TipoDato.BOOLEANO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor !== this.der.valor;
                }else {
                    errores.push(new Error('Semántico', 'Error en la operación relacional', this.fila, this.columna));
                    return null;
                }
                break;
            case ">":
                if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor > this.der.valor.charCodeAt(0);
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor.charCodeAt(0) > this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor.charCodeAt(0) > this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.CADENA && this.der.tipo === TipoDato.CADENA){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.CADENA && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.CHAR){   
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.CADENA){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.BOOLEANO){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.BOOLEANO && this.der.tipo === TipoDato.BOOLEANO){
                    this.valor = this.izq.valor > this.der.valor;
                }else if(this.izq.tipo === TipoDato.BOOLEANO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor > this.der.valor;
                }else {
                    errores.push(new Error('Semántico', 'Error en la operación relacional', this.fila, this.columna));
                    return null;
                }
                break;

            case "<":
                if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor < this.der.valor.charCodeAt(0);
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor < this.der.valor;
                    
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor < this.der.valor.charCodeAt(0);
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor.charCodeAt(0) < this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor.charCodeAt(0) < this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.CADENA && this.der.tipo === TipoDato.CADENA){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.CADENA && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.CADENA){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.BOOLEANO){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.BOOLEANO && this.der.tipo === TipoDato.BOOLEANO){
                    this.valor = this.izq.valor < this.der.valor;
                }else if(this.izq.tipo === TipoDato.BOOLEANO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor < this.der.valor;
                }else {
                    errores.push(new Error('Semántico', 'Error en la operación relacional', this.fila, this.columna));
                    return null;
                }
                break;

            case ">=":
                if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor >= this.der.valor.charCodeAt(0);
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor >= this.der.valor.charCodeAt(0);
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor.charCodeAt(0) >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor.charCodeAt(0) >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.CADENA && this.der.tipo === TipoDato.CADENA){
                    this.valor = this.izq.valor >= this.der.valor;
                } else if(this.izq.tipo === TipoDato.CADENA && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.DOUBLE){ 
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.CADENA){ 
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.BOOLEANO){   
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.BOOLEANO && this.der.tipo === TipoDato.BOOLEANO){
                    this.valor = this.izq.valor >= this.der.valor;
                }else if(this.izq.tipo === TipoDato.BOOLEANO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor >= this.der.valor;
                }else { 
                    errores.push(new Error('Semántico', 'Error en la operación relacional', this.fila, this.columna));
                    return null;
                }
                break;


            case "<=":
                if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor <= this.der.valor.charCodeAt(0);
                }else if(this.izq.tipo === TipoDato.ENTERO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor <= this.der.valor.charCodeAt(0);
                }else if(this.izq.tipo === TipoDato.DOUBLE && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor.charCodeAt(0) <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor.charCodeAt(0) <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.CHAR && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.CADENA && this.der.tipo === TipoDato.CADENA){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.CADENA && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor <= this.der.valor;
                }
                else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.ENTERO){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.DOUBLE){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.CHAR){
                    this.valor = this.izq.valor <= this.der.valor
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.CADENA){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.NULO && this.der.tipo === TipoDato.BOOLEANO){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.BOOLEANO && this.der.tipo === TipoDato.BOOLEANO){
                    this.valor = this.izq.valor <= this.der.valor;
                }else if(this.izq.tipo === TipoDato.BOOLEANO && this.der.tipo === TipoDato.NULO){
                    this.valor = this.izq.valor <= this.der.valor;
                }else {
                    errores.push(new Error('Semántico', 'Error en la operación relacional', this.fila, this.columna));
                    return null;
                }
                break;
            default:
                errores.push(new Error('Semántico', 'Error en la operación relacional', this.fila, this.columna));
                return null;

        }


       
        
    }

    getNodo() {
        let nodo = new NodoArbol("RELACIONAL");
        nodo.agregarHijoArbol(this.izq.getNodo());
        nodo.agregarHijo(this.operador);
        nodo.agregarHijoArbol(this.der.getNodo());
        return nodo;
    }
}

module.exports = OpRelacioneles;