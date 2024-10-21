const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const {errores} = require("../Errores/ListErrores.js");
const Error = require("../Errores/Error.js");
const NodoArbol = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");
const Return = require('../Expresiones/Return.js');

class Ejecutar extends Instruccion{
    constructor(id, parametros, linea, columna){
        super(TipoInstr.EJECUTAR, linea, columna);
        this.id = id;
        this.parametros = parametros;
    }

    ejecutar(entorno){
        let funcion = entorno.getFuncion(this.id);
        if(funcion != null){
            let nuevoEntorno = new Entorno(entorno.getGlobal(), 'EJECUTAR');
            if(this.parametros.length == funcion.parametros.length){
                for(let i = 0; i < this.parametros.length; i++){
                    let id = funcion.parametros[i].id;
                    let tipo = funcion.parametros[i].tipo;
                    this.parametros[i].valor.ejecutar(entorno);
                    let tipoParam = this.parametros[i].tipo;
                    let valor = this.parametros[i].valor.valor;
                    if(tipo == tipoParam){
                        nuevoEntorno.guardar(id, tipo, valor, 'let', this.linea, this.columna);
                        
                    }else{
                        errores.push(new Error('Semantico', `El tipo de dato no coincide con el parametro ${id}`, this.linea, this.columna));
                        return null;
                    }
                    
                }
                funcion.ejecutar(nuevoEntorno);
                /*
                for(let instr of funcion.instrucciones){
                    let res = instr.ejecutar(nuevoEntorno);
                    if(res instanceof Return){
                        return instr.valor;
                    }
                }*/
            }else{
              errores.push(new Error("Semantico", "No se encontro la funcion: " + this.id, this.linea, this.columna));
            }
        }
        return null;
    }

   

    getNodo(){
        let nodo = new NodoArbol("EJECUTAR", this.linea, this.columna);
        nodo.agregarHijo(this.id);
        let nodoParametros = new NodoArbol("PARAMETROS", this.linea, this.columna);
        for(let param of this.parametros){
            nodoParametros.agregarHijoArbol(param.getNodo());
        }
        nodo.agregarHijo(nodoParametros);
        return nodo;
    }
}

module.exports = Ejecutar;