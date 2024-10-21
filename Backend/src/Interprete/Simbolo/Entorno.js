const {Simbolo} = require('./Simbolo');
const SimVector = require('./SimVector');

class Entorno {
    constructor(anterior, nombre) {
        this.nombre = nombre;
        this.Variables = new Map();
        this.Vectores = new Map();
        this.Funciones = new Map();
        this.anterior = anterior;
    }

    guardarVariable(id, tipo, valor, tipoDato, fila, columna) {
        if(!this.buscarVariable(id)) {
            this.Variables.set(id, new Simbolo(id, tipo, valor, tipoDato, fila, columna));
            return true;
        }
        return false;
        
    }

    // Busca una variable en el entorno actual
    buscarVariable(id) {
        for(const entry of Array.from(this.Variables.entries())) {
            if(entry[0] === id) {
                return true;
            }
        }
        return false; 
    } 
    
    // obtiene una variable del entorno actual y si no la encuentra busca en el entorno anterior
    getVariable(id) {
        let env = this;
        while(env != null) {
            if(env.Variables.has(id)) {
                for(const entry of Array.from(env.Variables.entries())) {
                    if(entry[0] === id) {
                        return entry[1];
                    }
                }
            }
            env = env.anterior;
        }
        return null;
    }

    // actualiza el valor de una variable en el entorno actual
    actualizar_variable(nombre, new_valor) {
        let env = this;
        while (env != null) {
            if (env.Variables.has(nombre)) {
                for (let entry of Array.from(env.Variables)) {
                    if (entry[0] === nombre) {
                        entry[1].valor = new_valor;
                        return true;
                    }
                }
            }
            env = env.anterior;
        }
        return false;
    }

    // crear las funciones para guardar, buscar y obtener un vector
    guardarVector(id, tipo, valores, fila, columna) {
        if(!this.buscarVector(id)) {
            this.Vectores.set(id, new SimVector(id, tipo, valores, fila, columna));
            return true;
        }
        return false;
    }

    // Busca un vector en el entorno actual
    buscarVector(id) {
        for(const entry of Array.from(this.Vectores.entries())) {
            if(entry[0] === id) {
                return true;
            }
        }
        return false; 
    }

    // obtiene un vector del entorno actual y si no lo encuentra busca en el entorno anterior

    getVector(id) {
        let env = this;
        while(env != null) {
            if(env.Vectores.has(id)) {
                for(const entry of Array.from(env.Vectores.entries())) {
                    if(entry[0] === id) {
                        return entry[1];
                    }
                }
            }
            env = env.anterior;
        }
        return null;
    }

    // actualiza el valor de un vector en el entorno actual
    actualizar_vector(nombre, new_valor) {
        let env = this;
        while (env != null) {
            if (env.Vectores.has(nombre)) {
                for (let entry of Array.from(env.Vectores)) {
                    if (entry[0] === nombre) {
                        entry[1].valores = new_valor;
                        return true;
                    }
                }
            }
            env = env.anterior;
        }
        return false;
    }

    // crear metodo para guardar, buscar y obtener una funcion
    guardarFuncion(id, funcion) {
        if(!this.buscarFuncion(id)) {
            this.Funciones.set(id, funcion);
            return true;
        }
        return false;
    }

    // Busca una funcion en el entorno actual
    buscarFuncion(id) {
        for(const entry of Array.from(this.Funciones.entries())) {
            if(entry[0] === id) {
                return true;
            }
        }
        return false; 
    }

    // obtiene una funcion del entorno actual y si no la encuentra busca en el entorno anterior
    getFuncion(id) {
        let env = this;
        while(env != null) {
            if(env.Funciones.has(id)) {
                for(const entry of Array.from(env.Funciones.entries())) {
                    if(entry[0] === id) {
                        return entry[1];
                    }
                }
            }
            env = env.anterior;
        }
        return null;
    }

    // obtener entorno global
    getGlobal() {
        let env = this;
        while(env.anterior != null) {
            env = env.anterior;
        }
        return env;
    }

    guardar(id, tipo, valor, tipoDato, fila, columna){
        let env = this;
        while(env != null){
            if(env.Variables.has(id)){
                if(env.Variables.has(id)){
                    env.Variables.set(id, new Simbolo(id, tipo, valor, tipoDato, fila, columna));
                    return ;
                }
            }
            env = env.anterior;
        }
        this.Variables.set(id, new Simbolo(id, tipo, valor, tipoDato, fila, columna));
    }


    
    
}

module.exports.Entorno = Entorno;