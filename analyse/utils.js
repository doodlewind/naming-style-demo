const dictAll = {}
const dictA = {}
const dictB = {}

function getDictAll (line) {
  let [count, name] = line.split('\t')
  if (dictAll[name]) dictAll[name] += parseInt(count)
  else dictAll[name] = parseInt(count)
}

function getDictA (line) {
  let [count, name] = line.split('\t')
  if (dictA[name]) dictA[name] += parseInt(count)
  else dictA[name] = parseInt(count)
}

function getDictB (line) {
  let [count, name] = line.split('\t')
  if (dictB[name]) dictB[name] += parseInt(count)
  else dictB[name] = parseInt(count)
}

function cleanDict () {
  ['undefined', 'hasOwnProperty', 'toString', 'constructor'].forEach(key => {
    delete dictA[key]
    delete dictB[key]
    delete dictAll[key]
  })
}

function getY (dict) {
  const tmp = Object.keys(dict)
    .map(key => dict[key] * dict[key])
    .reduce((a, b) => a + b)
  return Math.pow(tmp, 0.5)
}

function getTheta () {
  let x = 0
  Object.keys(dictAll).forEach(key => {
    if (dictA[key] && dictB[key]) x += dictA[key] * dictB[key]
  })
  let yA = getY(dictA)
  let yB = getY(dictB)
  const result = x / (yA * yB)
  console.log(result)
}

module.exports = {
  analyse (srcA, srcB) {
    srcA.split('\n').forEach(getDictA)
    srcB.split('\n').forEach(getDictB)

    srcA.split('\n').forEach(getDictAll)
    srcB.split('\n').forEach(getDictAll)

    cleanDict()
    getTheta()
  }
}
