const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const {errores} = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const NodoArbol = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");
const Break = require("./Break.js");
const Continuar = require("./Continuar.js");
const Return = require("../Expresiones/Return.js");

class Dowhile extends Instruccion{
    constructor(instrucciones, condicion, linea, columna){
        super(TipoInstr.DOWHILE, linea, columna);
        this.instrucciones = instrucciones;
        this.condicion = condicion;
    }

    ejecutar(entorno){
        let cond = false;
        do{
            let nuevoEntorno2 = new Entorno(entorno, 'do while');
            entorno.guardarSubAmbito(nuevoEntorno2);
            for(let i = 0; i < this.instrucciones.length; i++){
                let instruccion = this.instrucciones[i];
                if(instruccion instanceof Continuar){
                    return instruccion ;
                }
                let res = instruccion.ejecutar(nuevoEntorno2);

                if(res instanceof Break){
                    return null;
                }
                if(res instanceof Return){
                    return res;
                }
                

            }
            this.condicion.ejecutar(nuevoEntorno2);
            cond = this.condicion.valor;
        }while(cond);
        return null;
    }

    getNodo(){
        let nodo = new NodoArbol("DOWHILE");
        nodo.agregarHijo("do");
        nodo.agregarHijo("{");
        let nodo2 = new NodoArbol("INSTRUCCIONES");
        for(let i = 0; i < this.instrucciones.length; i++){
            nodo2.agregarHijoArbol(this.instrucciones[i].getNodo());
        }
        nodo.agregarHijoArbol(nodo2);
        nodo.agregarHijo("}");
        nodo.agregarHijo("until");
        nodo.agregarHijo("(");
        nodo.agregarHijoArbol(this.condicion.getNodo());
        nodo.agregarHijo(")");
        return nodo;
    }
}

module.exports = Dowhile;