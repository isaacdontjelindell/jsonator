/* lexical grammar */
%lex
%%

\s+                             /* skip whitespace */
[a-zA-Z0-9]+\((?:.+)?\)     return 'STR'
"{{"                            return '{{'
"}}"                            return '}}'
<<EOF>>                         return 'EOF'
.                               return 'INVALID'

/lex

/* operator associations and precedence */
%token '{{' '}}'

%start expressions

%% /* language grammar */

expressions
    : e EOF
        { typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;

e
    : '{{' e '}}'
        {$$ = $2;}
    | STR
        {$$ = yytext;}
    ;
