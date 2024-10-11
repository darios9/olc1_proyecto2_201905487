const {Expresion, TipoDato } = require('../Abstracto/Expresion.js');
const { errores } = require('../Errores/ListErrores.js');
const  Error = require('../Errores/Error.js');
const { NodoArbol } = require('../Simbolo/NodoArbol.js');

class Cast extends Expresion{
    constructor(tipo, exp, fila, columna){
        super(null, tipo, fila, columna);
        this.exp = exp;
        this.tipo = tipo;
    }
    /*
    casteos:
        ● int a double
        ● double a int
        ● int a string
        ● int a char
        ● double a string
        ● char a int
        ● char a double
    */
   ejecutar(entorno){
        let valor = this.exp.ejecutar(entorno);
        switch(this.tipo){
            case TipoDato.ENTERO:
                if(this.exp.tipo == TipoDato.DOUBLE){
                    this.valor = parseInt(this.exp.valor);
                }else if(this.exp.tipo == TipoDato.CADENA){
                    this.valor = parseInt(this.exp.valor);
                }else if(this.exp.tipo == TipoDato.CHAR){
                    this.valor = this.exp.valor.charCodeAt(0);
                }
                break;
            case TipoDato.DOUBLE:
                if(this.exp.tipo == TipoDato.ENTERO){
                    this.valor = parseFloat(this.exp.valor);
                }else if(this.exp.tipo == TipoDato.CADENA){
                    this.valor = parseFloat(this.exp.valor);
                }else if(this.exp.tipo == TipoDato.CHAR){
                    this.valor = parseFloat(this.exp.valor.charCodeAt(0));
                }
                break;
            case TipoDato.CADENA:
                if(this.exp.tipo == TipoDato.ENTERO){
                    this.valor = this.exp.valor.toString();
                }else if(this.exp.tipo == TipoDato.DOUBLE){
                    this.valor = this.exp.valor.toString();
                }
                break;
            case TipoDato.CHAR:
                console.log("Valor de la variable a castear: "+valor);  
                if(this.exp.tipo == TipoDato.ENTERO){
                    this.valor = String.fromCharCode(this.exp.valor);
                }
                break;
            default:
                errores.push(new Error('Semántico', 'Tipo de dato no válido', this.fila, this.columna));
                break;
        }
        return null;
    }


    getNodo(){
        let nodo = new NodoArbol("CAST");
        nodo.agregarHijo("(");
        nodo.agregarHijo(this.tipo);
        nodo.agregarHijo(")");
        nodo.agregarHijo(this.exp.getNodo());
        return nodo;
    }

}

module.exports = Cast;