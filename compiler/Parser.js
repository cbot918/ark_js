import { log, logj } from './utils.js'

function Parser(tokens){
  this.tokens = tokens
  this.ast = {
    "type":"Program",
    "body":[]
  }
  this.block = []
  this.fns = 0

  this.isNext = function(tok, type){
    return tok.type === type
  }

  this.makeFnHeader = function(data){
    let node = {
      id:{}
    }
    node.type = data.type
    if (data.id){
      node.id = data.id
    }
    if (data.params){
      node.params = data.params
    }
    if (data.body){
      node.body = data.body
    }
    return node
  }

  this.makeFnBody = function(data){
    let node = {
      id:{}
    }
    node.type = data.type
    if (data.id){
      node.id = data.id
    }
    if (data.params){
      node.params = data.params
    }
    if (data.body){
      node.body = data.body
    }
    return node
  }

  function getId(tok){
    return {
      "type":tok.type,
      "name":tok.val
    }
  }
  function getParams(tokens, index){
    let move = index
    let params = []
    let count = 0
    while(tokens[move].type != "RIGHTPAREN"){
      if(tokens[move].type === "IDENTIFIER"){
        params.push({
          "type":"IDENTIFIER",
          "name":tokens[move].val
        })
      }
      move += 1
    }

    return params
  }
  function getBody(){
    
  }

  this.get = function(){
    this.block = this.ast.body
    this.tokens.forEach((tok, index) => {
      if (tok.type === "FUNC"){
        // if (!this.isNext(tok, "IDENTIFIER")){
        //   return
        // }
        let nodeData = {
          "type": "FunctionDeclaration",
          "id": getId(this.tokens[index+1]),
          "params": getParams(this.tokens, index+2),
          "body":[]
        }
        this.block.push(this.makeFnHeader(nodeData))
        this.block = this.block[this.fns].body
      }
      if (tok.type === "LEFTBRACKET"){
        let nodeData = {
          "type": "BlockStatement",
          // "id": getId(this.tokens[index+1]),
          // "params": getParams(this.tokens, index+2),
          "body":[]
        }
        this.block.push(this.makeFnBody(nodeData))
        return
      }

    });
    return this.ast
  }
}

export {
  Parser
}