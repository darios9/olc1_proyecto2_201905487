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
        this.casos = casos || [];
        this.defecto = defecto || [];
    }

    ejecutar(entorno) {
        this.expresion.ejecutar(entorno);
        let valor = this.expresion.valor;

        if (this.casos.length === 0 && this.defecto.length === 0) {
            errores.push(new Error("Semántico", "No se ha declarado ningún caso o defecto", this.linea, this.columna));
            this.tipo = TipoInstr.ERROR;
            return this.tipo;
        }

        let casoEncontrado = false;
        console.log("Ejecutando switch  fewdsww  "+ this.casos.length);

        if(this.casos.length > 0){
            for (let i = 0; i < this.casos.length; i++) {
                let caso = this.casos[i] ;
                caso.case.ejecutar(entorno);
                let expSwitch = caso.case.valor;
                console.log("Expresion switch: "+expSwitch);
    
                if (expSwitch == valor) {
                    casoEncontrado = true;
                    console.log("Ejecutando caso");
                    let nuevoEntorno = new Entorno(entorno, 'switch');
    
                    for (let j = 0; j < caso.INS.length; j++) {
                        let instruccion = caso.INS[j];
                        let res = instruccion.ejecutar(nuevoEntorno);
    
                        if (res instanceof Break) {
                            return null;
                        }
                    }
                }
            }
        }

        if (!casoEncontrado) {
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
        nodo.agregarHijo("switch");
        nodo.agregarHijo("(");
        nodo.agregarHijo(this.expresion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");

        this.casos.forEach(caso => {
            let nodoCaso = new NodoArbol("CASO");
            nodoCaso.agregarHijo("case");
            nodoCaso.agregarHijo(caso.case.getNodo());
            nodoCaso.agregarHijo(":");
            caso.INS.forEach(instruccion => {
                nodoCaso.agregarHijo(instruccion.getNodo());
            });
            nodo.agregarHijo(nodoCaso);
        });

        if (this.defecto.length > 0) {
            let nodoDefecto = new NodoArbol("DEFECTO");
            nodoDefecto.agregarHijo("default");
            nodoDefecto.agregarHijo(":");
            this.defecto.forEach(instruccion => {
                nodoDefecto.agregarHijo(instruccion.getNodo());
            });
            nodo.agregarHijo(nodoDefecto);
        }

        nodo.agregarHijo("}");
        return nodo;
    }
}

module.exports = Switch;