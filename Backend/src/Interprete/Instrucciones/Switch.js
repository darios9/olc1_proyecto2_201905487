const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const  NodoArbol  = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");
const Break = require("./Break.js");
const Continuar = require("./Continuar.js");

class Switch extends Instruccion {
    constructor(expresion, casos, defecto, linea, columna) {
        super(TipoInstr.SWITCH, linea, columna);
        this.expresion = expresion;
        if (typeof casos != 'undefined') {
            this.casos = casos;
        }
        if (typeof defecto != 'undefined') {
            this.defecto = defecto;
        }
    }

    ejecutar(entorno) {
        this.expresion.ejecutar(entorno);
        let valor = this.expresion.valor;

        if (typeof this.casos === 'undefined' && typeof this.defecto === 'undefined') {
            errores.push(new Error("Semántico", "No se ha declarado ningún caso o defecto", this.linea, this.columna));
            this.tipo = TipoInstr.ERROR;
            return this.tipo;
        }

        let casoEncontrado = false;
        if(typeof this.casos != 'undefined'){
            let sinBreak = false;
            for (let i = 0; i < this.casos.length; i++) {
                let caso = this.casos[i] ;
                caso.case.ejecutar(entorno);
                let expSwitch = caso.case.valor;
                if (valor === expSwitch) {
                    casoEncontrado = true;
                    let nuevoEntorno = new Entorno(entorno, 'switch');
                    entorno.guardarSubAmbito(nuevoEntorno);
    
                    for (let j = 0; j < caso.INS.length; j++) {
                        let instruccion = caso.INS[j];
                        if(instruccion instanceof Continuar){    
                            return instruccion;
                        }
                        let res = instruccion.ejecutar(nuevoEntorno);
    
                        if (res instanceof Break) {
                            return null;
                        }
                        if(res instanceof Return){
                            return res;
                        }
                        if(res instanceof Continuar){
                            return res;
                        }
                        sinBreak = true;
                        
                    }
                    continue;
                }
                if(sinBreak){
                    let nuevoEntorno = new Entorno(entorno, 'switch');
                    entorno.guardarSubAmbito(nuevoEntorno);
                    for (let k = 0; k < caso.INS.length; k++) {
                        let instruccion = caso.INS[k];

                        if(instruccion instanceof Continuar){    
                            return instruccion;
                        }

                        let res = instruccion.ejecutar(nuevoEntorno);
                        if (res instanceof Break) {
                            return null;
                        }
                    }

                }
            }
        }

        if (!casoEncontrado ) {
            let nuevoEntorno = new Entorno(entorno, 'switch');
            entorno.guardarSubAmbito(nuevoEntorno);
            for (let i = 0; i < this.defecto.length; i++) {
                let instruccion = this.defecto[i];
                let res = instruccion.ejecutar(nuevoEntorno);
                if (res instanceof Break) {
                    return null;
                }
                if(res instanceof Return){
                    return res;
                }
                if(res instanceof Continuar){
                    return res;
                }
            }
        }
    }

    getNodo() {
        let nodo = new NodoArbol("SWITCH");
        nodo.agregarHijo("switch");
        nodo.agregarHijo("(");
        nodo.agregarHijoArbol(this.expresion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        if (typeof this.casos != 'undefined') {
            let nodoCasos = new NodoArbol("CASOS");
            for (let caso of this.casos) {
                let nodoCaso = new NodoArbol("CASO");
                nodoCaso.agregarHijo("case");
                nodoCaso.agregarHijoArbol(caso.case.getNodo());
                nodoCaso.agregarHijo(":");
                let nodoInstrucciones = new NodoArbol("INSTRUCCIONES");
                for (let instr of caso.INS) {
                    nodoInstrucciones.agregarHijoArbol(instr.getNodo());
                }
                nodoCaso.agregarHijoArbol(nodoInstrucciones);
                nodoCasos.agregarHijoArbol(nodoCaso);
            }
            nodo.agregarHijoArbol(nodoCasos);
        }
        if (typeof this.defecto != 'undefined') {
            let nodoDefecto = new NodoArbol("DEFECTO");
            nodoDefecto.agregarHijo("default");
            nodoDefecto.agregarHijo(":");
            let nodoInstrucciones = new NodoArbol("INSTRUCCIONES");
            for (let instr of this.defecto) {
                nodoInstrucciones.agregarHijoArbol(instr.getNodo());
            }
            nodoDefecto.agregarHijoArbol(nodoInstrucciones);
            nodo.agregarHijoArbol(nodoDefecto);
        }
        nodo.agregarHijo("}");
        return nodo;
    }
    
}

module.exports = Switch;