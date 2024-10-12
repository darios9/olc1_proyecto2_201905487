const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const { NodoArbol } = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");
const Break = require("./Break.js");

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
            for(let i = 0; i < this.instrucciones.length; i++){
                let instruccion = this.instrucciones[i];
                let res = instruccion.ejecutar(nuevoEntorno2);
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

    getArbol(){
        let nodo = new NodoArbol("FOR", this.linea, this.columna);
        nodo.agregarHijo(this.declaracion.getArbol());
        nodo.agregarHijo(this.condicion.getArbol());
        nodo.agregarHijo(this.incremento.getArbol());
        let nodoInstrucciones = new NodoArbol("INSTRUCCIONES", this.linea, this.columna);
        for(let i = 0; i < this.instrucciones.length; i++){
            let instruccion = this.instrucciones[i];
            nodoInstrucciones.agregarHijo(instruccion.getArbol());
        }
        nodo.agregarHijo(nodoInstrucciones);
        return nodo;
    }
}

module.exports = For;