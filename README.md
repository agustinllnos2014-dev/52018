# Analizador Léxico-Sintáctico e Intérprete — Lenguaje "Usuario"

**Universidad Tecnológica Nacional - Facultad Regional Mendoza**  
**Sintaxis y Semántica de los Lenguajes de Programación**  
**Legajo:** 52018  

---

## 📌 Descripción del Proyecto
Analizador de un lenguaje personalizado de definición de usuarios implementado con **ANTLR4** y **JavaScript (Node.js)**. El analizador cumple con las fases fundamentales del proceso de traducción y realiza las siguientes tareas:

| Fase/Tarea | Descripción |
| :--- | :--- |
| **1. Análisis léxico y sintáctico** | Informa si la entrada es correcta o contiene errores, indicando la línea y causa exacta. |
| **2. Tabla de lexemas/tokens** | Muestra todos los lexemas reconocidos con su tipo de token, línea y columna. |
| **3. Árbol de análisis sintáctico** | Construye y muestra el árbol sintáctico concreto en formato de texto estructurado estilo ANTLR (LISP). |
| **4. Interpretación** | Traduce el código de usuarios a JavaScript equivalente y lo ejecuta como un intérprete básico. |

---

## ⚙️ Gramática Implementada (`Usuario.g4`)
El analizador reconoce estructuras de bloques de usuarios con atributos tipados (cadenas, números y booleanos en español). Un resumen de las reglas principales:

```antlr
programa: usuario* EOF;
usuario: 'usuario' identificador '{' atributo* '}';
atributo: identificador '=' valor ';';
valor: numero | cadena | booleano;
booleano: 'verdadero' | 'falso';

--------------------------------------------------------------------------------
🚀 Requisitos Previos
No se requiere Java para ejecutar este proyecto, ya que el lexer y el parser están implementados directamente en JavaScript y utilizan la librería antlr4 de npm solo como entorno de soporte. Solo se necesita:
Node.js v16 o superior.
npm v8 o superior.

--------------------------------------------------------------------------------
🛠️ Instalación y Ejecución
1. Clonar el repositorio y acceder a la carpeta:
git clone https://github.com/agustinllnos2014-dev/52018.git
cd 52018
2. Instalar las dependencias (librería de ANTLR4 para JS):
npm install
3. Ejecutar el analizador: Para probar el analizador, se debe ejecutar el archivo index.js pasándole como argumento la ruta del archivo de texto a evaluar.
node index.js ejemplos/input_correcto_1.txt

--------------------------------------------------------------------------------
📂 Archivos de Prueba Incluidos
El proyecto incluye una carpeta ejemplos/ con casos de prueba para evaluar los distintos escenarios del analizador:
Archivo
Descripción del código fuente
Resultado Esperado
input_correcto_1.txt
Un usuario con atributos estándar (nombre, edad, activo).
✔️ Válido. Muestra tabla, árbol y ejecuta la creación.
input_correcto_2.txt
Declaración de múltiples usuarios (Administrador e Invitado).
✔️ Válido. Ejecuta secuencialmente ambos usuarios.
input_incorrecto_1.txt
Error de omisión de carácter (falta ; en una asignación y la llave de cierre }).
❌ Error Sintáctico. Detiene el análisis y reporta la falla.
input_incorrecto_2.txt
Error léxico y gramatical (palabra reservada mal escrita usuari y valor true en lugar de verdadero).
❌ Error Sintáctico/Léxico. Reporta los símbolos no reconocidos.

--------------------------------------------------------------------------------
💻 Herramientas Utilizadas
Node.js — Entorno de ejecución principal.
ANTLR4 v4.13.2 — Herramienta de reconocimiento de lenguajes y generador del Lexer/Parser.
Visual Studio Code — Entorno de desarrollo utilizado.
