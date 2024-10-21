const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const {errores} = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const NodoArbol = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");
const Break = require("./Break.js");

class Loop extends Instruccion{
    constructor(instrucciones, linea, columna){
        super(TipoInstr.LOOP, linea, columna);
        this.instrucciones = instrucciones;
    }

    ejecutar(entorno){
        let nuevoEntorno = new Entorno(entorno, 'loop');
        let cond = true;
        do{
            let nuevoEntorno2 = new Entorno(nuevoEntorno, 'loop');
            for(let i = 0; i < this.instrucciones.length; i++){
                let instruccion = this.instrucciones[i];
                let res = instruccion.ejecutar(nuevoEntorno2);
                if(res instanceof Break){
                    cond = false;
                    break;
                }
            }
        }while(cond);
        return null;
    }

    getNodo(){
        let nodo = new NodoArbol("LOOP");
        nodo.agregarHijo("loop");
        nodo.agregarHijo("{");
        let nodo2 = new NodoArbol("INSTRUCCIONES");
        for(let i = 0; i < this.instrucciones.length; i++){
            nodo2.agregarHijoArbol(this.instrucciones[i].getNodo());
        }
        nodo.agregarHijoArbol(nodo2);
        nodo.agregarHijo("}");
        return nodo;
    }
}

module.exports = Loop;