const fs = require("fs");
const { exec } = require("child_process");

let cuerpo = "";
let contador = 0;

function graficarArbol(arbolitos) {
  contador = 1;
  cuerpo = "";
  graphAST("n0", arbolitos);
  const principal = `digraph arbolAST{ 
    n0[label="${arbolitos.valor.replace(/"/g, '\\"')}"];
    ${cuerpo}
  }`;
  fs.writeFile("arbolAST.dot", principal, () => {});
  exec("dot -Tsvg arbolAST.dot -o arbolAST.svg", (error, stdout, stderr) => {
    if (error || stderr) {
      console.error("Error al generar el SVG:", error || stderr);
      return;
    }
    console.log("SVG generado exitosamente");
  });
  return principal;
}

function graphAST(texto, padre) {
  for (const hijo of padre.listaHijos) {
    const nombreHijo = `n${contador}`;
    cuerpo += `${nombreHijo}[label="${String(hijo.valor).replace(/"/g, '\\"')}"];
    ${texto} -> ${nombreHijo};\n`;
    contador++;
    graphAST(nombreHijo, hijo);
  }
}

module.exports = graficarArbol;