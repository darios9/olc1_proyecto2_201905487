const { Instruccion, TipoInstr } = require("../Abstracto/Instrucciones.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const NodoArbol = require("../Simbolo/NodoArbol.js");
const e = require("express");
const { TipoDato } = require("../Abstracto/Expresion.js");
const {Entorno} = require("../Simbolo/Entorno.js");
const Break = require("./Break.js");
const Continuar = require("./Continuar.js");


class While extends Instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(TipoInstr.WHILE, linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    ejecutar(entorno) {
        this.condicion.ejecutar(entorno);
        let cond = this.condicion.valor;
        while (cond) {
            let nuevoEntorno = new Entorno(entorno, 'while');
            for (let i = 0; i < this.instrucciones.length; i++) {
                let instruccion = this.instrucciones[i];

                if (instruccion instanceof Continuar) {
                    return instruccion;
                }


                let res = instruccion.ejecutar(nuevoEntorno);
                if (res instanceof Break) {
                    return null;
                }
            }
            this.condicion.ejecutar(nuevoEntorno);
            cond = this.condicion.valor;
        }
        return null;
    }

    getNodo() {
        let nodo = new NodoArbol("WHILE");
        nodo.agregarHijo("while");
        nodo.agregarHijo("(");
        nodo.agregarHijoArbol(this.condicion.getNodo());
        nodo.agregarHijo(")");
        let instrucciones = new NodoArbol("INSTRUCCIONES");
        for (let instr of this.instrucciones) {
            instrucciones.agregarHijoArbol(instr.getNodo());
        }
        nodo.agregarHijoArbol(instrucciones);
        return nodo;
    }
}

module.exports = While;