import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDarkTheme } from '@codemirror/theme-one-dark';
import { javaLanguage } from '@codemirror/lang-java';
import fileDownload from 'js-file-download';
import './App.css';


function App() {

  const [code, setCode] = useState('');
  const [out, setOut] = useState('');
  const [cst, setCst] = useState('');
  const [ast, setAst] = useState('');
  const [simbols, setSimbols] = useState('');
  const [errores, setErrores] = useState([]);
 

  const onChange = React.useCallback((value, ViewUpdate) => {
    setCode(value);
  }, []);

  
  const handleClick = () => {
    fetch('http://localhost:3000/Analyzer', {
        headers: {
            'Content-Type': 'application/json'
        },
      method: 'POST',
      body: JSON.stringify({
        "code": code
      })

    }).then(res =>{
        if(!res.ok){
          throw new Error('Error');
        }
        return res.json();
    })
    .then(data => {
      setOut(data.console);
      setCst(data.cst);
      setAst(data.ast);
      setSimbols(data.simbols);
      setErrores(data.errores[0]);
    }).catch(error => {
        console.log(error);
    });
    console.log("estaba en la disco pereando "+code);
  }

  const handleGenerate = () => {
    console.log(cst);
    console.log();
    console.log(ast);

    fileDownload(cst, "cst.dot");
    fileDownload(ast, "ast.dot");
    
  }

  const handleSimbols = () => {
    console.log(simbols);
    
    
  }

  return (
    <div className='container'>
      <h1 className='TituloAnalyzer'> CompInterpreter </h1>
      <div className="editors">
        <CodeMirror
          className='cm1'
          width='100%'
          height='100%'
          theme={oneDarkTheme}
          extensions={[javaLanguage]}
          onChange={onChange}
        />

        <CodeMirror
          className='cm2'
          value={out}
          width='100%'
          height='100%'
          readOnly='true'
          theme={oneDarkTheme}
        />
      </div>
      <div className='button'>
          <button className='btn1' onClick={handleClick}> Analizar </button>
          <button className='btn2' onClick={handleGenerate}> Generate Tree </button>
          <button className='btn3' onClick={handleSimbols}> Simbols </button>
        </div>
          <div className='table-container'>
          <h1 className='TituloAnalyzer'> TABLA DE SIMBOLOS </h1>
            <table>
              <thead>
                <tr>
                  <th>Ámbito</th>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Tipo de Datos</th>
                  <th>Fila</th>
                  <th>Columna</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(simbols).map(scope => (
                  Object.keys(simbols[scope]).map(variable => (
                    <tr key={`${scope}-${variable}`}>
                      <td>{scope}</td>
                      <td>{simbols[scope][variable].id}</td>
                      <td>{simbols[scope][variable].tipo}</td>
                      <td>{simbols[scope][variable].valor}</td>
                      <td>{simbols[scope][variable].tipoDatos}</td>
                      <td>{simbols[scope][variable].fila}</td>
                      <td>{simbols[scope][variable].columna}</td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
      <div className='table-container'>
      <h1 className='TituloAnalyzer'> ERRORES </h1>
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Fila</th>
              <th>Columna</th>
            </tr>
          </thead>
          <tbody>
            {errores.map((error, index) => (
              <tr key={index}>
                <td>{error.tipo}</td>
                <td>{error.descripcion}</td>
                <td>{error.fila}</td>
                <td>{error.columna}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default App
