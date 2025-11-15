# Presentación del proyecto (para CV / entrevistas)

Este documento es la versión preparada para presentar el proyecto en un portafolio o en tu CV. Contiene descripción, pasos rápidos de ejecución y bullets listos para copiar.

## Resumen corto (una línea)

Analizador e intérprete para un lenguaje personalizado usando Jison y Node.js con frontend React para edición y ejecución interactiva.

## Qué incluye el repositorio

- Analizador (Jison): `Backend/src/Analizador/Analizador.jison` y `Analizador.js`.
- Intérprete y servidor API (Express): `Backend/src/index.js` y `Backend/src/Interprete/`.
- Frontend React (Vite): `Frontend/`.
- Casos de prueba: `Archivos de prueba/`.

## Comandos rápidos (Windows PowerShell)

Backend:

```powershell
cd "c:\Users\dioni\OneDrive\Escritorio\Nueva carpeta\Proyecto2_2S\Backend\src"
npm install
npm run start
```

Frontend (opcional):

```powershell
cd "c:\Users\dioni\OneDrive\Escritorio\Nueva carpeta\Proyecto2_2S\Frontend"
npm install
npm run dev
```

Probar API (substituye ruta si es necesario):

```powershell
$content = Get-Content -Raw "c:\Users\dioni\OneDrive\Escritorio\Nueva carpeta\Proyecto2_2S\Archivos de prueba\archivo1.ci"
Invoke-RestMethod -Uri http://localhost:3000/Analyzer -Method Post -ContentType 'application/json' -Body (@{code=$content} | ConvertTo-Json)
```

## Bullets listos para CV / LinkedIn

- Implementé un analizador léxico/sintáctico con Jison y generé el parser para mi lenguaje.  
- Diseñé la gramática, manejé precedencia y resolví ambigüedades en expresiones complejas.  
- Construí y recorrí un AST para ejecutar instrucciones, con soporte para funciones, vectores y llamadas.  
- Implementé manejo estructurado de errores (léxicos/sintácticos/semánticos) y una tabla de símbolos.  
- Exposición mediante API REST (Express) y editor web en React (Vite) para demostraciones interactivas.

## Preguntas comunes en entrevistas (respuestas breves)

- ¿Por qué Jison? — Porque permite definir lexer y gramática en un solo flujo y mapear acciones a constructores AST en JavaScript; facilita prototipar un lenguaje en el ecosistema Node.
- ¿Cómo modelaste el scope y la tabla de símbolos? — Usé la clase `Entorno` para almacenar símbolos por alcance; funciones crean nuevos entornos y el intérprete busca en la jerarquía.
- ¿Cómo manejas errores? — Errores léxicos y sintácticos se acumulan en una lista (`ListErrores`) y se muestran en el frontend; errores semánticos los lanza el intérprete con ubicación (línea/columna).

## Siguientes pasos recomendados (para mejorar empleabilidad)

- Añadir tests automáticos (parser + intérprete) y métricas de cobertura.  
- Integrar CI (GitHub Actions) con lint y tests.  
- Grabar un demo corto (1-2 minutos) mostrando edición y ejecución en el navegador.
