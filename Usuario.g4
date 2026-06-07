grammar Usuario;

// --- Reglas Sintácticas ---
programa: usuario* EOF;
usuario: 'usuario' identificador '{' atributo* '}';
atributo: identificador '=' valor ';';
valor: numero | cadena | booleano;
booleano: 'verdadero' | 'falso';

identificador: IDENTIFICADOR_LEX;
numero: NUMERO_LEX;
cadena: CADENA_LEX;

// --- Reglas Léxicas (Tokens) ---
IDENTIFICADOR_LEX: LETRA (LETRA | DIGITO)*;
NUMERO_LEX: DIGITO+;
CADENA_LEX: '"' (~'"')* '"'; 

fragment LETRA: [a-zA-Z];
fragment DIGITO: '0'..'9';

// Símbolos requeridos: no es estrictamente necesario definirlos como tokens explícitos 
// si la cadena los atrapa con ~'"', pero ignoramos espacios en general
WS: [ \t\r\n]+ -> skip;
  