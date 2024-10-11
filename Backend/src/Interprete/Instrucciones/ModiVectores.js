const { Instruccion, TipoInstr } = require("../Abstracto/Instrucciones.js");
const { errores } = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const { NodoArbol } = require("../Simbolo/NodoArbol.js");
const SimVector = require("../Simbolo/SimVector.js");


class ModVectores extends Instruccion {
    constructor(id, exp1, exp2, exp3, linea, columna) {
        super(TipoInstr.DECLARAR, linea, columna);
        this.id = id;
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.exp3 = exp3;
    }

    ejecutar(entorno) {
        let valor3 = this.exp3.ejecutar(entorno);
        let valorExp = this.exp3.valor;
        let tipo = this.exp3.tipo;

        if( this.exp2 == null){
            this.exp1.ejecutar(entorno);
            let indice = this.exp1.valor;
            let Svec = entorno.buscarVector(this.id);
            let obtenerVector = entorno.getVector(this.id);
            if(Svec){
                if(tipo == obtenerVector.tipo){
                    obtenerVector.valores[indice] = valorExp;
                }else{
                    errores.push(new Error('Semántico', 'El tipo de dato no coincide con el vector', this.linea, this.columna));
                }
            }
        }else{
            this.exp1.ejecutar(entorno);
            this.exp2.ejecutar(entorno);
            let indice1 = this.exp1.valor;
            let indice2 = this.exp2.valor;
            let Svec = entorno.buscarVector(this.id);
            let obtenerVector = entorno.getVector(this.id);
            if(Svec){
                if(tipo == obtenerVector.tipo){
                    obtenerVector.valores[indice1][indice2] = valorExp;
                }else{
                    errores.push(new Error('Semántico', 'El tipo de dato no coincide con el vector', this.linea, this.columna));
                }
            }
        }
    }

    getNodo() {
        let nodo = new NodoArbol("DECLARAR");
        nodo.agregarHijo(this.id);
        if(this.exp1 != null){
            nodo.agregarHijo("[");
            nodo.agregarHijo(this.exp1.getNodo());
            nodo.agregarHijo("]");
        }
        if(this.exp2 != null){
            nodo.agregarHijo("[");
            nodo.agregarHijo(this.exp2.getNodo());
            nodo.agregarHijo("]");
        }
        nodo.agregarHijo("=");
        nodo.agregarHijo(this.exp3.getNodo());
        return nodo;
    }


}

module.exports = ModVectores;

