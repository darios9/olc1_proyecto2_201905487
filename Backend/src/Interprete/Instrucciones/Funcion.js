const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const {errores} = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const NodoArbol  = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");
const Return = require('../Expresiones/Return.js');

class Funcion extends Instruccion{
    constructor(tipoDato, id, parametros, instrucciones, linea, columna){
        super(TipoInstr.FUNCION, linea, columna);
        this.tipoDato = tipoDato;
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }

    ejecutar(entorno){
       entorno.guardarFuncion(this.id, this);
    }

    getNodo(){
        let nodo = new NodoArbol("FUNCION");
        nodo.agregarHijo(this.tipoDato);
        nodo.agregarHijo(this.id);
        nodo.agregarHijo("(");
        if(this.parametros != undefined){
            let param = new NodoArbol("PARAMETROS");
            for(let i = 0; i < this.parametros.length; i++){
                param.agregarHijo(this.parametros[i].id);
                param.agregarHijo(":");
                param.agregarHijo(this.parametros[i].tipo);
                if(this.parametros[i].valor != undefined){
                    param.agregarHijo(this.parametros[i].valor.getNodo());
                }
            }
            nodo.agregarHijoArbol(param);
        }
        let param = new NodoArbol("PARAMETROS");
        nodo.agregarHijoArbol(param);
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        if(this.instrucciones != undefined){
            let instruc = new NodoArbol("INSTRUCCIONES");
            for(let i = 0; i < this.instrucciones.length; i++){
                if(this.instrucciones[i] != undefined){
                    instruc.agregarHijoArbol(this.instrucciones[i].getNodo());
                }
            }
            nodo.agregarHijoArbol(instruc);
        }
        nodo.agregarHijo("}");
        return nodo;
    }

}

module.exports = Funcion;