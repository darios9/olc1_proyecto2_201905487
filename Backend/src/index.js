// Importa Express
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {errores, clearErrores} = require('./Interprete/Errores/ListErrores');
const Error = require('./Interprete/Errores/Error');
const analizador = require('./Analizador/Analizador.js');
const {Entorno} = require('./Interprete/Simbolo/Entorno');
const Singlenton = require('./Interprete/Singlenton/Singlenton');
const { Instruccion } = require('./Interprete/Abstracto/Instrucciones.js');
const Funcion  = require('./Interprete/Instrucciones/Funcion.js');
const Ejecutar = require('./Interprete/Instrucciones/Ejecutar.js');
const NodoArbol = require('./Interprete/Simbolo/NodoArbol.js');
const graficarArbol = require('./Interprete/Graficar.js');
const obtenerSimbols = require('./Interprete/ObtenerSimbols.js');
const { TipoDato } = require('./Interprete/Abstracto/Expresion.js');
const Call = require('./Interprete/Expresiones/Call.js');
const e = require('express');

// Crea una aplicación Express
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(bodyParser.json());

// Define el puerto donde correrá la API
const port = 3000;

// Crea una ruta para responder a solicitudes GET
app.get('/', (req, res) => {
  res.send('¡Hola mundo esto es mi ');
});






app.post('/Analyzer', (req, res) => {
  let { code } = req.body;
  try {
    let ent = new Entorno(null, 'global');
    let sing = Singlenton.getInstance();
    let Inicio = new NodoArbol("INICIO");
    let instruc = new NodoArbol("INSTRUCCIONES");
    sing.clearConsola();
    clearErrores();
    sing.clearErrores();
    sing.addError(errores);
  
    let result = analizador.parse(code);

    for (const instr of result) {
      try {
        if(instr instanceof Funcion){
          instr.ejecutar(ent);
          instruc.agregarHijoArbol(instr.getNodo());
        }
      } catch (error) {
        console.error(error);
      }
    }

    for (const instr of result) {
      if (instr instanceof Funcion || instr instanceof Ejecutar || instr instanceof Call) {
        continue;
      }
      try {
          instr.ejecutar(ent);
          instruc.agregarHijoArbol(instr.getNodo());
        
      } catch (error) {
        console.error(error);
      }
    }


    // segunda pasada para el resto de instrucciones
    for (const instr of result) {
      if(instr instanceof Ejecutar){
        try {
          instr.ejecutar(ent);
          instruc.agregarHijoArbol(instr.getNodo());
        } catch (error) {
          console.error(error);
        }
      }
    }
    

    Inicio.agregarHijoArbol(instruc);
    let simbols = new obtenerSimbols(ent);
    let resultSym = simbols.getSymbolTable();
    res.status(200).json({console: sing.getConsola(), ast: graficarArbol(Inicio) , simbols: resultSym , errores: sing.getErrores()});
    console.log("********** Consola **********");
    console.log(sing.getConsola());
    console.log("********** Errores **********");
    console.log(sing.getErrores());
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Ocurrió un error inesperado'});
  }
}
);


// Inicia el servidor
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});