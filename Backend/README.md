# Backend — Cómo ejecutar

Ruta: `Backend/src`

Requisitos: Node.js (>=14 recomendado), npm

Pasos rápidos (PowerShell):

```powershell
cd "c:\Users\dioni\OneDrive\Escritorio\Nueva carpeta\Proyecto2_2S\Backend\src"
npm install
npm run start
```

El servidor arranca en http://localhost:3000 y expone:

- POST /Analyzer — JSON { "code": "<tu código>" } → devuelve { console, ast, simbols, errores }

Notas:

- Si vas a desarrollar activamente puedes usar `npm run dev` (usa nodemon) para reinicios automáticos.
- Revisa `Analizador/Analizador.jison` para cambiar la gramática y `Analizador/Analizador.js` si necesitas inspeccionar el parser generado.
