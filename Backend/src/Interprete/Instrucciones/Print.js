const Singlenton = require("../Singlenton/Singlenton.js");
const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const { TipoDato } = require("../Abstracto/Expresion.js");
const Error = require("../Errores/Error.js")
const {errores}  = require("../Errores/ListErrores.js")
const NodoArbol = require("../Simbolo/NodoArbol.js");

class Print extends Instruccion{
    constructor(exp, linea, columna){
        super(TipoInstr.PRINT,linea,columna);
        this.exp = exp;
    }

    ejecutar(entorno){
        let dato = this.exp.ejecutar(entorno);
        let sing = Singlenton.getInstance()
        let val;
        if(this.exp.tipo == TipoDato.ERROR){
            sing.addConsola("Error" + this.exp.valor)
            errores.push(new Error("Error Semantico", dato, this.fila, this.columna));
        }
        if(this.exp.valor === undefined){
            val = dato;
        }else{
            val = this.exp.valor;
        }
        sing.addConsola(val);
        return;

    }

    getNodo(){
        let nodo = new NodoArbol("PRINT", this.linea, this.columna);
        nodo.agregarHijo("print");
        nodo.agregarHijo("(");
        nodo.agregarHijoArbol(this.exp.getNodo());
        nodo.agregarHijo(")");
        return nodo;
    }
}

module.exports = Print;
