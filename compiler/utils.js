const log = console.log

const logj = function(obj){
  console.log(JSON.stringify(obj,null,"  "))
}

export { log, logj }