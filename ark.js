const log = console.log
const logj = function(obj){
  console.log(JSON.stringify(obj,null,"  "))
}


import { Tokenizer } from "./compiler/Tokenizer.js"
import { Parser } from "./compiler/Parser.js"
import { AsmGenerator } from "./compiler/AsmGenerator.js"
import { getContent } from "./compiler/Readfile.js"

const file = "testcase/hello.ark"

const content = getContent(file) + "\0"
const tokensObj = new Tokenizer(content)
const astObj = new Parser(tokensObj.get())
// const asmObj = new AsmGenerator(astObj)

log("tokens: "); log(tokensObj.get())

log("ast: "); 
logj(astObj.get())