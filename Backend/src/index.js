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
    sing.clearConsola();
    clearErrores();
    sing.clearErrores();
    sing.addError(errores);
    

    let result = analizador.parse(code);
    
    for (const instr of result) {
      try {
        if(instr instanceof Instruccion){
          instr.ejecutar(ent);
        }
      } catch (error) {
        console.error(error);
      }
    }
    
    res.status(200).json({console: sing.getConsola()});
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