const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const { TipoDato } = require("../Abstracto/Expresion.js");
const Error = require("../Errores/Error.js")
const {errores}  = require("../Errores/ListErrores.js")
const Simbolo = require("../Simbolo/Simbolo.js");

class Asignacion extends Instruccion{
    constructor(id, exp, linea, columna){
        super(TipoInstr.ASIGNACION,linea,columna);
        this.id = id;
        this.exp = exp;
    }

    ejecutar(entorno){
        let variable = entorno.buscarVariable(this.id);
        let sim = entorno.getVariable(this.id);
        if(sim){
            let valor = this.exp.ejecutar(entorno);
            if(sim.tipoDato == "let"){
                
                if(sim.tipo == this.exp.tipo){
                    
                    entorno.actualizar_variable(this.id, this.exp.valor);
                }else{
                    errores.push(new Error("Semántico", "Error de tipos en la asignación", this.fila, this.columna));
                }
            }else{
                errores.push(new Error("Semántico", "La variable " + this.id + " es constante", this.fila, this.columna));
            }

        }else{
            errores.push(new Error("Semántico", "Variable no encontrada", this.fila, this.columna));
        }
    }

    getNodo(){
        let nodo = new NodoArbol("ASIGNACION");
        nodo.agregarHijo(this.id);
        nodo.agregarHijo("=");
        nodo.agregarHijo(this.exp.getNodo());
        return nodo;
    }

}

module.exports = Asignacion;