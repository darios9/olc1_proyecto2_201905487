class Simbolo {
    constructor(id, tipo, valor, tipoDato, fila, columna) {
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
        this.tipoDato = tipoDato;
        this.fila = fila;
        this.columna = columna;
    }
}

const TipoSimbolo = {
    VARIABLE: 'VARIABLE',
    CONSTANTE: 'CONSTANTE',
    FUNCION: 'FUNCION',
    ARREGLO: 'ARREGLO',
    PARAMETRO: 'PARAMETRO',
    CLASE: 'CLASE'
}

module.exports = { Simbolo, TipoSimbolo };