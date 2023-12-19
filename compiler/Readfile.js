import { readFileSync } from 'node:fs'

function getContent(filename){
  return readFileSync(filename, 'utf8')
}

export {
  getContent
}