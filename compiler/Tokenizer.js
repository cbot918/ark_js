const log = console.log

const TTYPE = ["FUNC", "LEFTPAREN", "RIGHTPAREN", "STRING", "COMMA","RETURN", "LEFTBRACKET", "RIGHTBRACKET", "DOUBLEQUOTE", "PLUS", "LITERAL","IDENTIFIER"]

// const ATYPE = []

function Tokenizer(content){
  this.tokens = []
  this.c = content
  this.i = 0

  this.isChar = function(c)  {
    let n = c.charCodeAt(0);
    return (n >= 65 && n < 91) || (n >= 97 && n < 123);
  }
  this.isSymbol = function(c){
    return c === "(" || c === ")" || c === "," || c === "{" || c === "}" || c === "+"
  }  
  this.isDoublequote = function(c) {
    return c === "\""
  }
  this.get = function(){    
    while(true){
      if(this.c[this.i] === "\0"){
        break;
      }

      // tok strings
      if (this.isChar(this.c[this.i])){
        let val = ""
        let token = {}
        while (this.isChar(this.c[this.i])){
          val += this.c[this.i]
          this.i += 1
        }
        token.val = val
        switch (val) {
          case "func":
            token.type = "FUNC"; break;
          case "string":
            token.type = "STRING"; break;
          case "return":
            token.type = "RETURN"; break;
          default:
            token.type = "IDENTIFIER"; break;
        }

        this.tokens.push(token)
      }
      
      // tok symbol
      if (this.isSymbol(this.c[this.i])){
        let val = ""
        let token = {}

        token.val = this.c[this.i]

        switch (this.c[this.i]) {
          case "(":
            token.type = "LEFTPAREN"; break;
          case ")":
            token.type = "RIGHTPAREN"; break;
          case ",":
            token.type = "COMMA"; break;
          case "{":
            token.type = "LEFTBRACKET"; break;
          case "}":
            token.type = "RIGHTBRACKET"; break;
          case "+":
            token.type = "PLUS"; break
          default: break;
        }

        this.tokens.push(token)
      }

      // tok STRINGLITERAL
      if (this.isDoublequote(this.c[this.i])){
        let val = ""
        let token = {}
        this.i += 1
        while (true){
          if (this.isDoublequote(this.c[this.i])){
            break
          }
          val += this.c[this.i]
          this.i += 1
        }
        token.val = val
        token.type = "LITERAL"
        this.tokens.push(token)
      }

      this.i += 1
    }
    // log(this.tokens)
    return this.tokens
  }
}

export {
  Tokenizer
}