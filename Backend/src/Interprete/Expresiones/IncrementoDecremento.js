const {Expresion, TipoDato} = require('../Abstracto/Expresion.js');
const {errores} = require('../Errores/ListErrores.js');
const Error = require('../Errores/Error.js');
const  NodoArbol = require('../Simbolo/NodoArbol.js');

class IncrementoDecremento extends Expresion {
    constructor(id, operador, fila, columna) {
        super(null, TipoDato.NULO, fila, columna);
        this.id = id;
        this.operador = operador;
    }

    ejecutar(entorno) {
        let val = this.id.ejecutar(entorno);
        let variable = entorno.buscarVariable(val.id);

        if(variable!=null){
            if(val.tipo == TipoDato.ENTERO || val.tipo == TipoDato.DOUBLE){
                if(this.operador == "++"){
                    val.valor++;
                    this.valor = val.valor;
                    entorno.actualizar_variable(val.id, this.valor);
                }else if(this.operador == "--"){
                    val.valor--;
                    this.valor = val.valor;
                    entorno.actualizar_variable(val.id, val.valor);

                }
            }else{
                errores.push(new Error('Semántico', 'Incremento o decremento solo se puede aplicar a variables numéricas', this.fila, this.columna));
            }
        }else{
            errores.push(new Error('Semántico', 'Variable no encontrada', this.fila, this.columna));
        }
        return null;
    }

    getNodo() {
        let nodo = new NodoArbol("INCREMENTO/DECREMENTO");
        nodo.agregarHijoArbol(this.id.getNodo());
        nodo.agregarHijo(this.operador);
        return nodo;
    }
}

module.exports = IncrementoDecremento;