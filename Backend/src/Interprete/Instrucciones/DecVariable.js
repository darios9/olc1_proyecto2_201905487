const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const { TipoDato } = require("../Abstracto/Expresion.js");
const Error = require("../Errores/Error.js")
const {errores}  = require("../Errores/ListErrores.js")
const Simbolo = require("../Simbolo/Simbolo.js");
const NodoArbol = require("../Simbolo/NodoArbol.js");

class DecVariable extends Instruccion{

    constructor(tipoVar, tipo, id, exp, linea, columna){
        super(TipoInstr.DECLARACION,linea,columna);
        this.tipoVar = tipoVar;
        this.tipo = tipo;
        this.id = id;
        this.exp = exp;
    }

    ejecutar(entorno){
        if (this.id.length == 0 && this.exp == null){
            errores.push(new Error("Semántico", "No se ha declarado ninguna variable", this.fila, this.columna));
            return;
        }

        for(let i = 0; i < this.id.length; i++){
            // convertir a string
            let id = this.id[i].toString();
            let variable = entorno.buscarVariable(id);
            if(variable){
                errores.push(new Error("Semántico", "La variable " + id + " ya existe", this.fila, this.columna));
                return;
            }

            if(this.exp != null){
                let ejec = this.exp.ejecutar(entorno);
                entorno.guardarVariable(id, this.tipo, this.exp.valor, this.tipoVar, this.fila, this.columna);
            }else{
                entorno.guardarVariable(id, this.tipo, null, this.tipoVar, this.fila, this.columna);
            }
        }

        return null;
       
    }

    getNodo(){
        let nodo = new NodoArbol("DECLARACION");
        nodo.agregarHijo(this.tipoVar.toString());
        for(let i = 0; i < this.id.length; i++){
            nodo.agregarHijo(this.id[i].toString());
        }
        nodo.agregarHijo(":");
        nodo.agregarHijo(this.tipo.toString());
        if(this.exp != null){
            nodo.agregarHijo("=");
            nodo.agregarHijoArbol(this.exp.getNodo());
        }
        return nodo;
    }

    

    
}

module.exports = DecVariable;

