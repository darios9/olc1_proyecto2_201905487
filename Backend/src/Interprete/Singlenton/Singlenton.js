class Singlenton {
    constructor(){
        this.consola = "";
        this.errores = []; 
    }

    static getInstance(){
        if(!Singlenton.instance){
            Singlenton.instance = new Singlenton();
        }
        return Singlenton.instance;
    }

    addConsola(texto){
        this.consola += texto+"\n";
    }

    getConsola(){
        return this.consola;
    }

    clearConsola(){
        this.consola = "";
    }

    addError(error){
        this.errores.push(error);
    }

    getErrores(){
        return this.errores;
    }

    clearErrores(){
        this.errores = [];
    }

}

module.exports = Singlenton;

