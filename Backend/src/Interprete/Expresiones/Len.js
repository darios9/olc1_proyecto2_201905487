const {Expresion, TipoDato} = require("../Abstracto/Expresion.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const NodoArbol = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");

class Len extends Expresion{
    constructor(tipo2, exp, linea, columna){
        super(TipoDato.ERROR, TipoDato.ENTERO, linea, columna);
        this.exp = exp;
        this.tipo2 = tipo2;
    }

    ejecutar(entorno){
        switch(this.tipo2){
            case "LEN":
                let variable = entorno.getVariable(this.exp);
                if(variable){
                let nuevoValor =entorno.getVariable(this.exp);
                if (nuevoValor.tipo == TipoDato.CADENA){
                    this.tipo = TipoDato.ENTERO;
                    this.valor = nuevoValor.valor.length;
                    return this.valor;
                    }else{
                        errores.push(new Error('Semántico', `No es una cadena`, this.linea, this.columna));
                    }
                }

                let vec = entorno.getVector(this.exp);
                if(vec){
                    this.tipo = TipoDato.ENTERO;
                    this.valor = vec.valores.length;
                    return this.valor;
                }else{
                    errores.push(new Error('Semántico', `error en los datos`, this.linea, this.columna));
                }
                break;
            case "REVERSE":
                let vec1 = entorno.getVector(this.exp);
                if(vec1){
                    this.tipo = TipoDato.VECTOR;
                    this.valor = vec1.valores.reverse();
                    entorno.actualizar_vector(this.exp, this.valor);
                    return this.valor;      
                }
                break;
            case "MAX":
                let vec2 = entorno.getVector(this.exp);
                if(vec2){
                    this.tipo = TipoDato.ENTERO;
                    this.valor = Math.max.apply(null, vec2.valores);
                    return this.valor;
                }
                break;
            default:
                errores.push(new Error('Semántico', 'Tipo de dato no válido', this.linea, this.columna));
                break;
        }
        return null;
    }

    getNodo(){
        let nodo = new NodoArbol("LEN");
        nodo.agregarHijo("(");
        nodo.agregarHijo(this.exp);
        nodo.agregarHijo(")");
        return nodo;
    }
}

module.exports = Len;