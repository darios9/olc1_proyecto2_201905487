const Singlenton = require("../Singlenton/Singlenton.js");
const {Instruccion, TipoInstr} = require("../Abstracto/Instrucciones.js");
const { TipoDato } = require("../Abstracto/Expresion.js");
const Error = require("../Errores/Error.js")
const {errores}  = require("../Errores/ListErrores.js")

class Print extends Instruccion{
    constructor(exp, linea, columna){
        super(TipoInstr.PRINT,linea,columna);
        this.exp = exp;
    }

    ejecutar(entorno){
        let dato = this.exp.ejecutar(entorno);
        let sing = Singlenton.getInstance()

        console.log("Dato en el print: "+ this.exp.valor+ " tipo: "+ this.exp.tipo)
        if(this.exp.tipo== TipoDato.ERROR){
            sing.addConsola("Error" + this.exp.valor)
            errores.push(new Error("Error Semantico", dato, this.fila, this.columna));
        }
        sing.addConsola(this.exp.valor)
        return;

    }
}

module.exports = Print;
