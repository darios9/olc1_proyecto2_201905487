class Expresion {
    constructor(valor, tipo, fila, columna) {
        this.valor = valor;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }

    ejecutar(entorno) {}

}

const TipoDato = {
    ENTERO: 'ENTERO',
    DOUBLE: 'DOUBLE',
    BOOLEANO: 'BOOLEANO',
    CADENA: 'CADENA',
    CHAR: 'CHAR',
    NULO: 'NULO',
    ERROR: 'ERROR'
}

module.exports = { Expresion, TipoDato };