const Error = require('./Error');

let errores = [];

const clearErrores = () => {
    errores.length = 0;
}

module.exports = {
    errores,
    clearErrores
};