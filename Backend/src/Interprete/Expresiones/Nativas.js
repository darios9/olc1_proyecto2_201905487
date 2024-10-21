const {Expresion, TipoDato} = require("../Abstracto/Expresion.js");
const {errores} = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const NodoArbol = require("../Simbolo/NodoArbol.js");
const {Entorno} = require("../Simbolo/Entorno.js");
const Return = require("../Expresiones/Return.js");

class Nativas extends Expresion{
    constructor(tipo, exp, linea, columna){
        super(null, tipo, linea, columna);
        this.exp = exp;
        this.tipo = tipo;
    }

    ejecutar(entorno){
        let valor = this.exp.ejecutar(entorno);

        switch(this.tipo.toLowerCase()){
            case "lower":
                if(this.exp.tipo == TipoDato.CADENA){
                    this.tipo = TipoDato.CADENA;
                    this.valor = this.exp.valor.toLowerCase();
                }
                break;
            case "upper":
                if(this.exp.tipo == TipoDato.CADENA){
                    this.tipo = TipoDato.CADENA;
                    this.valor = this.exp.valor.toUpperCase();
                }
                break;
            case "round":
                if(this.exp.tipo == TipoDato.DOUBLE){
                    this.tipo = TipoDato.ENTERO;
                    this.valor = Math.round(this.exp.valor);
                }
                break;
            case "truncate":
                if(this.exp.tipo == TipoDato.DOUBLE){
                    this.tipo = TipoDato.ENTERO;
                    this.valor = Math.trunc(this.exp.valor);
                }
                break;
            case "tostring":
                if(this.exp.tipo == TipoDato.ENTERO || this.exp.tipo == TipoDato.DOUBLE || this.exp.tipo == TipoDato.BOOLEANO){
                    this.tipo = TipoDato.CADENA;
                    this.valor = this.exp.valor.toString();
                }   
                break;
            case "tochararray":
                if(this.exp.tipo == TipoDato.CADENA){
                    this.tipo = TipoDato.CADENA;
                    this.valor = this.exp.valor.split('');
                }
                break;

            default:
                errores.push(new Error('Semántico', 'Tipo de dato no válido', this.fila, this.columna));
                break;
                
        }
        return null;
    }

    getNodo(){
        let nodo = new NodoArbol("CAST");
        nodo.agregarHijo(this.tipo);
        nodo.agregarHijo("(");
        nodo.agregarHijoArbol(this.exp.getNodo());
        nodo.agregarHijo(")");
        
        return nodo;
    }
}

module.exports = Nativas;