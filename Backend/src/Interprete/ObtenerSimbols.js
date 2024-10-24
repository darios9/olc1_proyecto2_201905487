class obtenerSimbols {
    constructor(globalEntorno) {
        this.globalEntorno = globalEntorno;
        this.symbolObject = {};
    }

    getAllVariables(ambito) {
        // Guardar las variables del ámbito actual
        this.symbolObject[ambito.nombre] = {};
        ambito.Variables.forEach((value, key) => {
            this.symbolObject[ambito.nombre][key] = {
                id: value.id,
                tipo: value.tipo,
                valor: value.valor,
                tipoDatos: value.tipoDato,
                fila: value.fila,
                columna: value.columna
            };
        });

        

        ambito.Vectores.forEach((value, key) => {
            this.symbolObject[ambito.nombre][key] = {
                id: value.id,
                tipo: value.tipo,
                valor: value.valores,
                tipoDatos: "let",
                fila: value.fila,
                columna: value.columna
            };
        });

        // Recursión para los subámbitos
        for (const subAmbito of ambito.subAmbitos) {
            this.getAllVariables(subAmbito);
        }
    }

    // Método público que inicia el proceso y retorna el objeto symbolObject
    getSymbolTable() {
        this.getAllVariables(this.globalEntorno);
        return this.symbolObject;
    }


}

module.exports = obtenerSimbols;