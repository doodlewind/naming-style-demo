const fs = require('fs')
const { resolve } = require('path')
const { analyse } = require('./utils')
const nameA = process.argv[2] || null
const nameB = process.argv[3] || null

function read (name) {
  return fs.readFileSync(
    resolve('./results/freq', name + '.txt'), 'utf8'
  )
}

if (nameA && nameB) {
  analyse(read(nameA), read(nameB))
} else console.error('invalid command, try `node analyser react`')
