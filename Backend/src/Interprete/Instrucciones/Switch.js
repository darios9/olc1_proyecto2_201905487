const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const { NodoArbol } = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");
const Break = require("./Break.js");

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
                if (expSwitch == valor) {
                    casoEncontrado = true;
                    let nuevoEntorno = new Entorno(entorno, 'switch');
    
                    for (let j = 0; j < caso.INS.length; j++) {
                        let instruccion = caso.INS[j];
                        let res = instruccion.ejecutar(nuevoEntorno);
    
                        if (res instanceof Break) {
                            return null;
                        }
                        sinBreak = true;
                        
                    }
                    continue;
                }
                if(sinBreak){
                    let nuevoEntorno = new Entorno(entorno, 'switch');
                    for (let k = 0; k < caso.INS.length; k++) {
                        let instruccion = caso.INS[k];
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
            for (let i = 0; i < this.defecto.length; i++) {
                let instruccion = this.defecto[i];
                let res = instruccion.ejecutar(nuevoEntorno);
                if (res instanceof Break) {
                    return null;
                }
            }
        }
    }

    getNodo() {
        let nodo = new NodoArbol("SWITCH");
        nodo.addHijo("switch");
        nodo.addHijo("(");
        nodo.addHijo(this.expresion.getNodo());
        nodo.addHijo(")");
        nodo.addHijo("{");
        let nodoCasos = new NodoArbol("CASOS");
        if (typeof this.casos != 'undefined') {
            for (let i = 0; i < this.casos.length; i++) {
                let caso = this.casos[i];
                let nodoCaso = new NodoArbol("CASO");
                nodoCaso.addHijo("case");
                nodoCaso.addHijo(caso.case.getNodo());
                nodoCaso.addHijo(":");
                let nodoInstrucciones = new NodoArbol("INSTRUCCIONES");
                for (let j = 0; j < caso.INS.length; j++) {
                    let instruccion = caso.INS[j];
                    nodoInstrucciones.addHijo(instruccion.getNodo());
                }
                nodoCaso.addHijo(nodoInstrucciones);
                nodoCasos.addHijo(nodoCaso);
            }
        }
        nodo.addHijo(nodoCasos);
        let nodoDefecto = new NodoArbol("DEFECTO");
        for (let i = 0; i < this.defecto.length; i++) {
            let instruccion = this.defecto[i];
            nodoDefecto.addHijo(instruccion.getNodo());
        }
        nodo.addHijo(nodoDefecto);
        nodo.addHijo("}");
        return nodo;
    }
}

module.exports = Switch;