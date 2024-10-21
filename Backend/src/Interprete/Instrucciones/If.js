const { Instruccion, TipoInstr } = require("../Abstracto/Instrucciones.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const NodoArbol = require("../Simbolo/NodoArbol.js");
const e = require("express");
const { TipoDato } = require("../Abstracto/Expresion.js");
const {Entorno} = require("../Simbolo/Entorno.js");
const Break = require("./Break.js");
const Continuar = require("./Continuar.js");
const Return = require("../Expresiones/Return.js");

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
        if (this.condicion.tipo != TipoDato.BOOLEANO) {
            errores.push(new Error("Semántico", `La condición del if no es booleana`, this.linea, this.columna));
            return;
        }
        if (this.condicion.valor) {
            let nuevoEntorno = new Entorno(entorno, 'if');
            for (let inst of this.instrucciones) {
                let res = inst.ejecutar(nuevoEntorno); 
                if (res instanceof Continuar) {
                    return res;
                }
                if (res instanceof Return) {
                    return res;
                }

                if (res instanceof Break) {
                    return res;
                }
                
                if (inst instanceof Continuar) {
                    return inst;
                }
                if (inst instanceof Break) {
                    break;
                }
                if (inst instanceof Return) {
                    return inst;
                }
                
            }
                
        }else if(typeof this.instElseIf != 'undefined'){
            let nuevoEntorno = new Entorno(entorno, 'else if');
            for (let inst of this.instElseIf.instrucciones) {
                let res = inst.ejecutar(nuevoEntorno); 
                if (res instanceof Continuar) {
                    return res;
                }
                if (res instanceof Return) {
                    console.log("entro a return  "+res.valor);
                    return res;
                }

                if (res instanceof Break) {
                    return res;
                }
                
                if (inst instanceof Continuar) {
                    return inst;
                }
                if (inst instanceof Break) {
                    break;
                }
                if (inst instanceof Return) {
                    console.log("entro a return  pero ruera "+inst.valor.valor);
                    return inst;
                }
                
            }
        }else {
            if (typeof this.insElse != 'undefined') {
                let nuevoEntorno = new Entorno(entorno, 'else');
                for (let inst of this.insElse) {
                    let res = inst.ejecutar(nuevoEntorno);
                    if (res instanceof Continuar) {
                        return res;
                    }

                    if (res instanceof Break) {
                        return res;
                    }
                    
                    if (res instanceof Return) {
                        console.log("entro a return else  "+res.valor);
                        return res;
                    }

                    
                    if (inst instanceof Continuar) {
                        return inst;
                    }
                    if (inst instanceof Break) {
                        return inst;
                    }
                    if (inst instanceof Return) {
                        console.log("entro a return  "+inst.valor);
                        return inst;
                    }
                }
            }
        }
    }

    getNodo() {
        let nodo = new NodoArbol("IF");
        nodo.agregarHijo("if");
        nodo.agregarHijo("(");
        nodo.agregarHijoArbol(this.condicion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        let instrucciones = new NodoArbol("INSTRUCCIONES");
        for (let inst of this.instrucciones) {
            instrucciones.agregarHijoArbol(inst.getNodo());
        }
        nodo.agregarHijoArbol(instrucciones);
        nodo.agregarHijo("}");
        if (typeof this.instElseIf != 'undefined') {
            nodo.agregarHijoArbol(this.instElseIf.getNodo());
        }else if (typeof this.insElse != 'undefined') {
            nodo.agregarHijo("else");
            nodo.agregarHijo("{");
            let instrucciones = new NodoArbol("INSTRUCCIONES");
            for (let inst of this.insElse) {
                instrucciones.agregarHijoArbol(inst.getNodo());
            }
            nodo.agregarHijoArbol(instrucciones);
            nodo.agregarHijo("}");
        }
        return nodo;
    }

    
}

module.exports = If;