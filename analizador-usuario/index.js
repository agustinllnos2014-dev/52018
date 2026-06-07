import fs from 'fs';
import antlr4 from 'antlr4';
import UsuarioLexer from './generated/UsuarioLexer.js';
import UsuarioParser from './generated/UsuarioParser.js';
import CustomUsuarioVisitor from './CustomUsuarioVisitor.js';

class CustomErrorListener extends antlr4.error.ErrorListener {
    constructor() {
        super();
        this.errors = [];
    }
    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        this.errors.push(`Línea ${line}:${column} - Causa: ${msg}`);
    }
}

function main() {
    const args = process.argv.slice(2);
    const fileName = args.length > 0 ? args[0] : 'input.txt';    
    let input;

    try {
        input = fs.readFileSync(fileName, 'utf8');
    } catch (err) {
        console.error(`❌ Error: No se pudo encontrar o leer el archivo '${fileName}'.`);
        return;
    }

    console.log("╔════════════════════════════════════════════════════════════╗");
    console.log(`║ ANALIZADOR LENGUAJE USUARIO - Archivo: ${fileName.padEnd(20)}║`);
    console.log("╚════════════════════════════════════════════════════════════╝");

    const chars = new antlr4.InputStream(input);
    const lexer = new UsuarioLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new UsuarioParser(tokens);

    const errorListener = new CustomErrorListener();
    lexer.removeErrorListeners();
    lexer.addErrorListener(errorListener);
    parser.removeErrorListeners();
    parser.addErrorListener(errorListener);

    parser.buildParseTrees = true;
    const tree = parser.programa();

    console.log("\n── FASE 1 y 2: ANÁLISIS LÉXICO Y SINTÁCTICO ──────────────────");
    if (errorListener.errors.length > 0) {
        console.error("⚠ LA ENTRADA CONTIENE ERRORES:");
        errorListener.errors.forEach(err => console.error(`   -> ${err}`));
        console.error("Análisis detenido por errores.");
        return; 
    } else {
        console.log("✔ Análisis exitoso — sin errores.");
    }

    console.log("\n── TABLA DE LEXEMAS Y TOKENS ─────────────────────────────────");
    console.log("LEXEMA".padEnd(25) + "│ TOKEN".padEnd(20) + "│ LÍNEA");
    console.log("──────────────────────────────────────────────────────────────");
    tokens.fill();
    tokens.tokens.forEach(token => {
        if (token.type !== antlr4.Token.EOF) {
            const tokenName = parser.symbolicNames[token.type] || parser.literalNames[token.type] || "Desconocido";
            const lexema = token.text.replace(/\r?\n/g, '\\n');
            console.log(`${lexema.padEnd(25)}│ ${tokenName.padEnd(18)}│ ${token.line}`);
        }
    });

    console.log("\n── ÁRBOL DE ANÁLISIS SINTÁCTICO CONCRETO ─────────────────────");
    console.log(tree.toStringTree(parser.ruleNames));

    console.log("\n── FASE 3: INTERPRETACIÓN (Traducción y Ejecución) ───────────");
    const visitor = new CustomUsuarioVisitor();
    const translatedJSCode = visitor.visit(tree);

    console.log("\n[CÓDIGO JAVASCRIPT GENERADO]:");
    console.log(translatedJSCode);
    
    console.log("\n[SALIDA DE LA EJECUCIÓN DEL INTÉRPRETE]:");
    try {
        eval(translatedJSCode);
    } catch(e) {
        console.error("Error en la ejecución:", e);
    }
}

main();
