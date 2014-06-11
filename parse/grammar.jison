
/* lexical grammar */
%lex
%%

\s+                             /* skip whitespace */
"{{"                            return '{{'
"}}"                            return '}}'
[a-zA-Z0-9]+\((?:.+)?\)         return 'FUNC'
[^\{\{].+[^\}\}]                return 'STR'
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
    | e e EOF
        { $$ = $1 + $2; }
    ;

e
    : '{{' FUNC '}}'
        {console.log('func: ' + $2); $$ = $2;}
    | STR
        { console.log('str: ' + $1); $$ = $1;}
    ;

