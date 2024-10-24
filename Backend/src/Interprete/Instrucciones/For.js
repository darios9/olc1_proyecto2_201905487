const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const  NodoArbol = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");
const Break = require("./Break.js");
const Continuar = require("./Continuar.js");
const Return = require("../Expresiones/Return.js");

class For extends Instruccion{
    constructor(declaracion, condicion, incremento, instrucciones, linea, columna){
        super(TipoInstr.FOR, linea, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.incremento = incremento;
        this.instrucciones = instrucciones;
    }

    ejecutar(entorno){
        let nuevoEntorno = new Entorno(entorno, 'for');
        this.declaracion.ejecutar(nuevoEntorno);
        this.condicion.ejecutar(nuevoEntorno);
        let cond = this.condicion.valor;
        while(cond){
            let nuevoEntorno2 = new Entorno(nuevoEntorno, 'for');
            entorno.guardarSubAmbito(nuevoEntorno2);
            for(let i = 0; i < this.instrucciones.length; i++){
                let instruccion = this.instrucciones[i];

                if(instruccion instanceof Continuar){
                    break;
                }
                
                if(instruccion instanceof Return){
                    return instruccion;
                }

                if(instruccion instanceof Break){
                    break;
                }
                let res = instruccion.ejecutar(nuevoEntorno2);

                if(res instanceof Continuar){
                    continue;
                }

                if(res instanceof Return){
                    return res;
                }

                if(res instanceof Break){
                    return null;
                }
            }
            this.incremento.ejecutar(nuevoEntorno);
            this.condicion.ejecutar(nuevoEntorno);
            cond = this.condicion.valor;
        }
        return null;
    }

    getNodo(){
        let nodo = new NodoArbol("FOR");
        nodo.agregarHijo("for");
        nodo.agregarHijo("(");
        nodo.agregarHijoArbol(this.declaracion.getNodo());
        nodo.agregarHijo(";");
        nodo.agregarHijoArbol(this.condicion.getNodo());
        nodo.agregarHijo(";");
        nodo.agregarHijoArbol(this.incremento.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        let instrucciones = new NodoArbol("INSTRUCCIONES");
        for(let instr of this.instrucciones){
            instrucciones.agregarHijoArbol(instr.getNodo());
        }
        nodo.agregarHijoArbol(instrucciones);
        nodo.agregarHijo("}");
        return nodo;
    }
}

module.exports = For;