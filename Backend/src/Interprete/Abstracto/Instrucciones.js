const {entorno} = require("../Simbolo/Entorno.js");

class Instruccion{
    constructor(tipo, fila, columna){
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }

    ejecutar(entorno){}
}

const TipoInstr = {
    PRINT: 'PRINT',
    IF: 'IF',
    ELSE: 'ELSE',
    ELSEIF: 'ELSEIF',
    WHILE: 'WHILE',
    RETURN: 'RETURN',
    BREAK: 'BREAK',
    SWITCH: 'SWITCH',
    DOWHILE: 'DOWHILE',
    CONTINUE: 'CONTINUE',
    FOR: 'FOR',
    DECLARAR: 'DECLARAR',
    BLOQUE: 'BLOQUE',
    TERNARIO: 'TERNARIO',
    VECTORES: 'VECTORES',
    ERROR: 'ERROR',
    FUNCION: 'FUNCION',
    LLAMADA: 'LLAMADA',
    EJECUTAR: 'EJECUTAR',
}

module.exports = {Instruccion, TipoInstr}