# 🚀 CompInterpreter - Proyecto 2 (OLC1)

[cite_start]**CompInterpreter** es un intérprete robusto diseñado para un lenguaje de programación de alto nivel, desarrollado para el curso de Organización de Lenguajes y Compiladores 1 en la Universidad de San Carlos de Guatemala. [cite_start]El sistema utiliza una arquitectura Full Stack para procesar, analizar y ejecutar código de forma eficiente a través de un entorno web.

## 🛠️ Especificaciones Técnicas
* [cite_start]**Backend:** Desarrollado en **Node.js** con **Express**.
* [cite_start]**Frontend:** Interfaz interactiva construida con **React** y **TypeScript**.
* [cite_start]**Análisis Léxico y Sintáctico:** Implementado mediante la herramienta **Jison**.
* [cite_start]**Comunicación:** Intercambio de datos mediante una **API REST**.

## 🧠 Características del Intérprete
El sistema implementa todas las fases de un compilador para un lenguaje con las siguientes capacidades:

* [cite_start]**Gestión de Ámbitos (Scopes):** Manejo preciso de variables globales y locales utilizando una **Tabla de Símbolos** dinámica.
* [cite_start]**Estructuras de Control:** Soporte completo para sentencias condicionales (`if`, `else`, `switch`) y ciclos de repetición (`while`, `for`, `do-while`).
* [cite_start]**Recursividad Avanzada:** Capacidad probada para ejecutar algoritmos complejos, incluyendo la **Función de Ackerman**, **Fibonacci** y recursividad cruzada (par/impar).
* [cite_start]**Manejo de Arreglos:** Soporte para vectores de una y dos dimensiones (matrices), incluyendo funciones nativas como `len()`, `sum()`, `average()`, `max()` y `min()`.
* [cite_start]**Tipado y Casteos:** Soporte para tipos de datos `int`, `double`, `string`, `char` y `bool`, incluyendo funciones de conversión explícita (Casteos).

## [cite_start]📊 Reportes Generados 
Para facilitar el proceso de depuración y análisis, el sistema genera:
1. **Tabla de Símbolos:** Detalle de todas las variables, tipos y ámbitos detectados durante la ejecución.
2. **Tabla de Errores:** Reporte detallado de errores léxicos, sintácticos y semánticos con su ubicación (línea y columna).
3. **Árbol de Sintaxis Abstracta (AST):** Representación gráfica de la estructura jerárquica del código analizado.

## 💻 Caso de Prueba Destacado: El Perceptrón
[cite_start]El intérprete es capaz de procesar lógica de inteligencia artificial básica, como el entrenamiento de un **Perceptrón**, gestionando la actualización de pesos, funciones de activación y cálculos de error en tiempo de ejecución.

## ⚙️ Instalación y Uso
1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/darios9/olc1_proyecto2_201905487](https://github.com/darios9/olc1_proyecto2_201905487)
