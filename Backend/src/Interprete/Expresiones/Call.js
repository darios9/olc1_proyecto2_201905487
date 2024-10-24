
const { Expresion, TipoDato } = require('../Abstracto/Expresion.js');
const { errores } = require('../Errores/ListErrores.js');
const  Error = require('../Errores/Error.js');
const NodoArbol = require("../Simbolo/NodoArbol.js");
const { Entorno } = require("../Simbolo/Entorno.js");
const Return = require('../Expresiones/Return.js');
const Continuar = require('../Instrucciones/Continuar.js');

class Call extends Expresion{
    constructor(id, parametros, linea, columna){
        super(id, TipoDato.NULO, linea, columna);
        this.id = id;
        this.parametros = parametros;
    }

    ejecutar(entorno){
        let global = entorno.getGlobal();

        let funcion = global.getFuncion(this.id);

        
        if(funcion != null){
            this.tipo = funcion.tipoDato;
            let nuevoEntorno = new Entorno(global, 'Funcion');
            entorno.guardarSubAmbito(nuevoEntorno);
            if(this.parametros.length == funcion.parametros.length){
                
                for(let i = 0; i < this.parametros.length; i++){
                    let id = funcion.parametros[i].id;
                    let tipo = funcion.parametros[i].tipo;
                    this.parametros[i].valor.ejecutar(entorno);
                    let valor = this.parametros[i].valor.valor;
                    let tipoParam = this.parametros[i].valor.tipo;
                    
                    
                    
                    if(tipo == tipoParam){
                        nuevoEntorno.guardarVariable(id, tipo, valor, 'let', this.linea, this.columna);
                        
                    }else{
                        errores.push(new Error('Semantico', `El tipo de dato no coincide con el parametro ${id}`, this.linea, this.columna));
                    }
                    
                }
                for(let instr of funcion.instrucciones){
                    let res = instr.ejecutar(nuevoEntorno);
                    if (res instanceof Return) {
                        this.tipo = res.tipo;
                        this.valor = res.valor;
                        return res;
                    }


                    if(instr instanceof Return){
                        this.tipo = funcion.tipoDato;
                        this.valor = instr.valor.valor;
                        break;
                    }
                    
                    
                    
                }    

            }else{
                errores.push(new Error('Semantico', 'La cantidad de parametros no coincide', this.linea, this.columna));
            }
        }else{
            errores.push(new Error('Semantico', `No se ha encontrado la funcion ${this.id}`, this.linea, this.columna));
        }

    }

    getNodo(){
        let nodo = new NodoArbol('CALL');
        nodo.agregarHijo(this.id);
        nodo.agregarHijo('(');
        for(let i = 0; i < this.parametros.length; i++){
            nodo.agregarHijoArbol(this.parametros[i].valor.getNodo());
            if(i < this.parametros.length - 1){
                nodo.agregarHijo(',');
            }
        }
        nodo.agregarHijo(')');
        return nodo;
    }
}

module.exports = Call;