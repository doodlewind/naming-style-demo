const fs = require('fs')
const { resolve } = require('path')
const acorn = require('acorn')
const walk = require('acorn/dist/walk')

function demo (content) {
  const ast = acorn.parse(content, { sourceType: 'module' })
  walk.simple(ast, {
    VariableDeclaration (node) {
      const name = node.declarations[0].id.name + '\n'
      fs.appendFileSync(resolve('./result.txt'), name)
    }
  })
  return content
}

module.exports = function (content) {
  return demo(content)
}
