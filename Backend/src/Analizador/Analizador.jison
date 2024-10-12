%{
    // Importaciones
    const {Instrucciones, TipoInstr} = require('../Interprete/Abstracto/Instrucciones.js');
    const {Expresion, TipoDato} = require('../Interprete/Abstracto/Expresion.js');
    const Error = require('../Interprete/Errores/Error.js');
    const {errores} = require('../Interprete/Errores/ListErrores.js');
    // Importaciones expresiones
    const Literal = require('../Interprete/Expresiones/Literal.js');
    const Arithmetica = require('../Interprete/Expresiones/Aritmetica.js');
    const NegacionUnaria = require('../Interprete/Expresiones/NegacionUnaria.js');
    const OpRelacionales = require('../Interprete/Expresiones/OpRelacionales.js');
    const Acceso = require('../Interprete/Expresiones/Acceso.js');
    const Ternario = require('../Interprete/Expresiones/Ternario.js');
    const OpLogicos = require('../Interprete/Expresiones/OpLogicos.js');
    const Cast = require('../Interprete/Expresiones/Cast.js');
    const IncrementoDecremento = require('../Interprete/Expresiones/IncrementoDecremento.js');
    const AccesoVector = require('../Interprete/Expresiones/AccesoVector.js');

    //importaciones de instrucciones
    const Imprimir = require('../Interprete/Instrucciones/Print.js');
    const DecVariable = require('../Interprete/Instrucciones/DecVariable.js');
    const Asignacion = require('../Interprete/Instrucciones/Asignacion.js');
    const DecVectores = require('../Interprete/Instrucciones/DecVectores.js');
    const ModiVectores = require('../Interprete/Instrucciones/ModiVectores.js');
    const If = require('../Interprete/Instrucciones/If.js');
    const Switch = require('../Interprete/Instrucciones/Switch.js');
    const Break = require('../Interprete/Instrucciones/Break.js');
    const While = require('../Interprete/Instrucciones/While.js');
    const For = require('../Interprete/Instrucciones/For.js');

%}

%lex

%options case-insensitive
%x Cadena
%x CARACTER
%%
/* Espacios en blanco */
"//".*            	{}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]           {}
[ \r\t]+            {}
\n                  {}
\s+                 {}
[']                 {Texto=""; this.begin("CARACTER");}
<CARACTER>[^'\\]"'"     {yytext = yytext.substr(0,yyleng-1); this.popState(); return 'CARACTER';}
<CARACTER>"\\n'"        {yytext = '\n'; this.popState(); return 'CARACTER';}
<CARACTER>"\\t'"        {yytext = "\t"; this.popState(); return 'CARACTER';}
<CARACTER>"\\r'"        {yytext = "\r"; this.popState(); return 'CARACTER';}
<CARACTER>"\\\"'"       {yytext = "\""; this.popState(); return 'CARACTER';}
<CARACTER>"\\''"        {yytext = "'"; this.popState(); return 'CARACTER';}       
<CARACTER>"\\\\'"       {yytext = "\\"; this.popState(); return 'CARACTER';}
<CARACTER><<EOF>>       return "EOF_IN_CARACTER";
<CARACTER>[^'\\]*"'"    {this.popState(); return 'CARACTER_ERROR';}

["]                 {Texto=""; this.begin("Cadena");}
<Cadena>[^"\\]+     {Texto+=yytext;}
<Cadena>"\\n"       {Texto+='\n';}
<Cadena>"\\t"       {Texto+="\t";}
<Cadena>"\\r"       {Texto+="\r";}
<Cadena>"\\\""      {Texto+="\"";}
<Cadena>"\\'"       {Texto+="\'";}
<Cadena>"\\\\"      {Texto+="\\";}
<Cadena><<EOF>>     return "EOF_IN_STRING";
<Cadena>["]         {yytext = Texto; this.popState(); return 'Cadena';}

"echo"                 return "PRINT";
"PRINTLN"               return "PRINTLN";
";"                     return "PTCOMA";
":"                     return "DOSPT"
"."                     return "PT";
","                     return "COMA";
"("                     return "PARIZ";
")"                     return "PARDER";
"["                     return "CORIZ";
"]"                     return "CORDER";
"{"                     return "LLAVEIZ";
"}"                     return "LLAVEDER";
"++"                    return "PLUS";
"--"                    return "MIN";

"+"                     return "MAS";
"-"                     return "MENOS";
"*"                     return "POR";
"/"                     return "DIV";
"%"                     return "MOD";
"^"                     return "ELEV";
"!="                    return "DIFERENTE";
"=="                    return "IIGUAL";
">="                    return "MAYORIGUAL";
"<="                    return "MENORIGUAL";
    
"<"                     return "MENOR";
">"                     return "MAYOR";
"="                     return "IGUAL";

"&&"                    return "AND";
"||"                    return "OR";
"!"                     return "NOT";

"int"                   return "INT";
"double"                return "DOUBLE";
"bool"               return "BOOLEAN";
"char"                  return "CHAR";
"string"                return "STRING";
"true"                  return "TRUE";
"false"                 return "FALSE";
"Let"                   return "LET";
"const"                 return "CONST";
"vector"                return "VECTOR";


"FOR"                   return "FOR";
"UNTIL"                 return "UNTIL";
"DO"                    return "DO";
"SWITCH"                return "SWITCH";
"IF"                    return "IF";
"ELSE"                  return "ELSE";
"NEW"                   return "NEW";
"RETURN"                return "RETURN";
"CONTINUE"              return "CONTINUE";
"BREAK"                 return "BREAK";
"LIST"                  return "LIST";
"ADD"                   return "ADD";
"CASE"                  return "CASE";
"DEFAULT"               return "DEFAULT";
"VOID"                  return "VOID";
"toLOWER"               return "LOWER";
"toUPPER"               return "UPPER";
"Length"                return "LENGTH";
"Truncate"              return "TRUNCATE";
"Round"                 return "ROUND";
"Typeof"                return "TYPEOF";
"toSTRING"              return "TOSTRING";
"toCharArray"           return "CHARARRAY";
"RUN"                  return "RUN";
"CAST"                  return "CAST";
"AS"                    return "AS";



[A-Za-z]([A-Za-z]|[0-9]|[_])*  return "ID";
[0-9]+"."[0-9]+\b         return "DOBLE";
[0-9]+\b                  return "ENTERO";

<<EOF>>                 return 'EOF';

. {
    errores.push(new Error("Error Lexico", `Error Lexico, caracter '${yytext}' no esperado.`, yylloc.first_line, yylloc.first_column));

    return 'ERROR_LEXICO';
}
/lex
                
/* Asociación de operadores y precedencia */
%left 'PARDER'
%left 'DOSPT'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IIGUAL' 'DIFERENTE' 'MENOR' 'MENORIGUAL' 'MAYOR' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'MOD'
%left 'ELEV'
%right UMENOS
%right FCAST
%left 'PLUS','MIN'

%start INIT

%%

INIT
    : LINS EOF      {return $1;}
    ;

LINS
    :LINS INS       {$1.push($2); $$=$1;}
    |INS            {$$= [$1];}
;

INS
    : IMPRIMIR PTCOMA { $$ = $1; }
    | DECLARACION PTCOMA { $$ = $1; }
    | ASIGNACION PTCOMA { $$ = $1; }
    | DTERNARIO PTCOMA { $$ = $1; }
    | FFOR { $$ = $1; }
    | INCREMENTO PTCOMA { $$ = $1; }
    | DECREMENTO PTCOMA { $$ = $1; }
    | FIF { $$ = $1; }
    | FSWITCH { $$ = $1; }
    | FBREAK { $$ = $1; }
    | FWHILE { $$ = $1; }
    |error    { errores.push(new Error("Error Sintactico", `Error Sintactico, caracter '${yytext}' no esperado.`, this._$.first_line, this._$.first_column));   
        console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

DECLARACION
    : LET LID DOSPT TIPODATO   { $$ = new DecVariable($1, $4, $2, null, $3,this._$.first_line, this._$.first_column); }
    | LET LID DOSPT TIPODATO IGUAL EXP { $$ = new DecVariable($1, $4, $2, $6, $3,this._$.first_line, this._$.first_column); }
    | CONST LID DOSPT TIPODATO IGUAL EXP { $$ = new DecVariable($1, $4, $2, $6, $3,this._$.first_line, this._$.first_column); }
    | CONST LID DOSPT TIPODATO { $$ = new DecVariable($1, $4, $2, null, $3,this._$.first_line, this._$.first_column); }
    | LET LID DOSPT TIPODATO CORIZ CORDER IGUAL NEW VECTOR TIPODATO CORIZ EXP CORDER { $$ = new DecVectores($2, $4,this._$.first_line, this._$.first_column, $12); }
    | LET LID DOSPT TIPODATO CORIZ CORDER CORIZ CORDER IGUAL NEW VECTOR TIPODATO CORIZ EXP CORDER CORIZ EXP CORDER { $$ = new DecVectores($2, $4, this._$.first_line, this._$.first_column, $14, $17); }
    | LET LID DOSPT TIPODATO CORIZ CORDER IGUAL CORIZ LEXPR CORDER { $$ = new DecVectores($2, $4, this._$.first_line, this._$.first_column, $9); }
    | LET LID DOSPT TIPODATO CORIZ CORDER CORIZ CORDER IGUAL CORIZ LEXPCORCHETE CORDER { $$ = new DecVectores($2, $4, this._$.first_line, this._$.first_column, $11); }

; 

ASIGNACION
    : ID IGUAL EXP { $$ = new Asignacion($1, $3, this._$.first_line, this._$.first_column); }
    |ID CORIZ EXP CORDER IGUAL EXP { $$ = new ModiVectores($1, $3, null, $6, this._$.first_line, this._$.first_column); }
    |ID CORIZ EXP CORDER CORIZ EXP CORDER IGUAL EXP { $$ = new ModiVectores($1, $3, $6, $9, this._$.first_line, this._$.first_column); }
;

    

IMPRIMIR
    : PRINT EXP  { $$ = new Imprimir($2, this._$.first_line, this._$.first_column); }

; 

FIF 
    : IF PARIZ EXP PARDER LLAVEIZ LINS LLAVEDER { $$ = new If($3, $6, this._$.first_line, this._$.first_column); }
    | IF PARIZ EXP PARDER LLAVEIZ LINS LLAVEDER ELSE FIF { $$ = new If($3, $6, undefined , $9, this._$.first_line, this._$.first_column); }
    | IF PARIZ EXP PARDER LLAVEIZ LINS LLAVEDER ELSE LLAVEIZ LINS LLAVEDER { $$ = new If($3, $6, $10, this._$.first_line, this._$.first_column); }
;

FWHILE
    : WHILE PARIZ EXP PARDER LLAVEIZ LINS LLAVEDER { $$ = new While($3, $6, this._$.first_line, this._$.first_column); }
;

FSWITCH
    : SWITCH PARIZ EXP PARDER LLAVEIZ LCASES DEFAULT DOSPT LINS LLAVEDER { $$ = new Switch($3, $6, $9, this._$.first_line, this._$.first_column); }
    | SWITCH PARIZ EXP PARDER LLAVEIZ DEFAULT DOSPT LINS LLAVEDER { $$ = new Switch($3, undefined, $8, this._$.first_line, this._$.first_column); }
    | SWITCH PARIZ EXP PARDER LLAVEIZ LCASES LLAVEDER { $$ = new Switch($3, $6, undefined, this._$.first_line, this._$.first_column); }
    | SWITCH PARIZ EXP PARDER LLAVEIZ LLAVEDER { $$ = new Switch($3, undefined, undefined, this._$.first_line, this._$.first_column); }
;

LCASES
    : LCASES CASE EXP DOSPT LINS { $$ = $1; $$.push({case: $3, INS: $5}); }
    | CASE EXP DOSPT LINS { $$ = [{case: $2, INS: $4}]; }

;

FBREAK
    : BREAK PTCOMA { $$ = new Break(this._$.first_line, this._$.first_column); }
;

FFOR
    :FOR PARIZ DECLARACION PTCOMA EXP PTCOMA ACTUALIZACION LLAVEIZ LINS LLAVEDER { $$ = new For($3, $5, $7, $9, this._$.first_line, this._$.first_column); }
    |FOR PARIZ ASIGNACION PTCOMA EXP PTCOMA ACTUALIZACION LLAVEIZ LLAVEDER { $$ = new For($3, $5, $7, $9, this._$.first_line, this._$.first_column); }

;

ACTUALIZACION
    :ASIGNACION PARDER { $$ = $1; }
    |INCREMENTO PARDER { $$ = $1; }
    |DECREMENTO PARDER{ $$ = $1; }
;

DOWHILE
    : DO LLAVEIZ LINS LLAVEDER UNTIL PARIZ EXP PARDER PTCOMA { $$ = new DoWhile($3, $7, this._$.first_line, this._$.first_column); }


EXP 
    : EXP MAS EXP           {$$ = new Arithmetica($1, "+",  $3,this._$.first_line, this._$.first_column);}
    | EXP MENOS EXP         {$$ = new Arithmetica($1, "-", $3, this._$.first_line, this._$.first_column);}
    | EXP POR EXP           {$$ = new Arithmetica($1, "*", $3, this._$.first_line, this._$.first_column);}
    | EXP DIV EXP           {$$ = new Arithmetica($1, "/", $3, this._$.first_line, this._$.first_column);}
    | EXP ELEV EXP          {$$ = new Arithmetica($1, "^", $3, this._$.first_line, this._$.first_column);}
    | EXP AND EXP           {$$ = new OpLogicos($1, $3, "&&", this._$.first_line, this._$.first_column);}
    | EXP OR EXP            {$$ = new OpLogicos($1, $3, "||", this._$.first_line, this._$.first_column);}
    | NOT EXP               {$$ = new OpLogicos(null, $2, "!", this._$.first_line, this._$.first_column);}
    | PARDER EXP PARDER     {$$ = $2;}
    |EXP MENOR EXP          {$$ = new OpRelacionales($1, $3, "<",  this._$.first_line, this._$.first_column);}
    |EXP MAYOR EXP          {$$ = new OpRelacionales($1, $3, ">", $3, this._$.first_line, this._$.first_column);}
    |EXP MENORIGUAL EXP     {$$ = new OpRelacionales($1, $3, "<=", $3, this._$.first_line, this._$.first_column);}
    |EXP MAYORIGUAL EXP     {$$ = new OpRelacionales($1, $3, ">=", $3, this._$.first_line, this._$.first_column);}
    |EXP DIFERENTE EXP      {$$ = new OpRelacionales($1, $3, "!=", $3, this._$.first_line, this._$.first_column);}
    |EXP IIGUAL EXP         {$$ = new OpRelacionales($1, $3, "==", $3, this._$.first_line, this._$.first_column);}
    |DTERNARIO              {$$ = $1;}
    |CASTEOS                {$$ = $1;}
    |INCREMENTO             {$$ = $1;}
    |DECREMENTO             {$$ = $1;}
    | F                     {$$ = $1;}
    |ID CORIZ EXP CORDER    { $$ = new AccesoVector($1, $3, null, this._$.first_line, this._$.first_column); }
    |ID CORIZ EXP CORDER CORIZ EXP CORDER { $$ = new AccesoVector($1, $3, $6, this._$.first_line, this._$.first_column); }
    | MENOS EXP %prec UMENOS{$$ = new NegacionUnaria($2, this._$.first_line, this._$.first_column);}
;

TIPODATO
    : INT           {$$ = TipoDato.ENTERO;}
    | DOUBLE        {$$ =  TipoDato.DOUBLE;}
    | BOOLEAN       {$$ = TipoDato.BOOLEANO;}
    | CHAR          {$$ = TipoDato.CHAR;}
    | STRING        {$$ = TipoDato.CADENA;}
;


LEXPR
    : LEXPR COMA EXP    { $$ = $1; $$.push($3);}
    | EXP               {$$ = [$1];}
;

LID 
    : LID COMA ID       { $$ = $1; $$.push($3);}
    | ID                { $$ = [$1];}
;

LEXPCORCHETE
    : LEXPCORCHETE COMA CORIZ LEXPR CORDER { $$ = $1; $$.push($4); }
    | CORIZ LEXPR CORDER { $$ = [$2]; }
;

DTERNARIO
    : IF PARIZ EXP PARDER EXP DOSPT EXP  { $$ = new Ternario($3, $5, $7, this._$.first_line, this._$.first_column); }

;
CASTEOS
    : CAST PARIZ EXP AS TIPODATO PARDER { $$ = new Cast($5, $3, this._$.first_line, this._$.first_column); }
;
INCREMENTO
    : EXP PLUS { $$ = new IncrementoDecremento($1, "++", this._$.first_line, this._$.first_column); }
;

DECREMENTO
    : EXP MIN { $$ = new IncrementoDecremento($1, "--", this._$.first_line, this._$.first_column); }
;

F 
:DOBLE{ $$ = new Literal($1, TipoDato.DOUBLE, @1.first_line, @1.first_column); }
|ENTERO{ $$ = new Literal($1, TipoDato.ENTERO, @1.first_line, @1.first_column); }
|TRUE{ $$ = new Literal('true', TipoDato.BOOLEANO, @1.first_line, @1.first_column); }
|FALSE{ $$ = new Literal('false', TipoDato.BOOLEANO, @1.first_line, @1.first_column); }
|CARACTER{ $$ = new Literal($1, TipoDato.CHAR, @1.first_line, @1.first_column); }
|Cadena{ $$ = new Literal($1, TipoDato.CADENA, @1.first_line, @1.first_column); }
|ID {   $$ = new Acceso($1, @1.first_line, @1.first_column); }
;

