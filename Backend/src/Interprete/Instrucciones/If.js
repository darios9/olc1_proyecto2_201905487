const { Instruccion, TipoInstr } = require("../Abstracto/Instrucciones.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const { NodoArbol } = require("../Simbolo/NodoArbol.js");
const e = require("express");
const { TipoDato } = require("../Abstracto/Expresion.js");
const {Entorno} = require("../Simbolo/Entorno.js");

class If extends Instruccion {
    constructor(condicion, instrucciones, insElse, instElseIf, linea, columna) {
        super(TipoInstr.IF, linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        if (typeof insElse!= 'undefined') {
            this.insElse = insElse;
        }else if(typeof instElseIf != 'undefined'){
            this.instElseIf = instElseIf;
        }
        
    }

    ejecutar(entorno) {
        this.condicion.ejecutar(entorno);
        console.log("Condicion solo para ver como esta : ", this.condicion.tipo);
        if (this.condicion.tipo != TipoDato.BOOLEANO) {
            errores.push(new Error("Semántico", `La condición del if no es booleana`, this.linea, this.columna));
            return;
        }
        if (this.condicion.valor) {
            let nuevoEntorno = new Entorno(entorno, 'if');
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                if (instruccion instanceof Instruccion) {
                    instruccion.ejecutar(nuevoEntorno);
                }
            }
        } else {
            if (typeof this.insElse != 'undefined') {
                let nuevoEntorno = new Entorno(entorno, 'else');
                for (let i = 0; i < this.insElse.length; i++) {
                    const instruccion = this.insElse[i];
                    if (instruccion instanceof Instruccion) {
                        instruccion.ejecutar(nuevoEntorno);
                    }
                }
            }else if(typeof this.instElseIf != 'undefined'){
                console.log("Entro al else if");
                let inst = this.instElseIf.ejecutar(entorno);
            }
        }
    }

    
}

module.exports = If;