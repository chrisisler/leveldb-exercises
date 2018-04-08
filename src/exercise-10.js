// lessons:
// - dont grab all data from db then filter, let db filter for you
// - encode schema in data (?)
// - dont close the database?

/** @type {(Object, Array<String>, Function) -> ()} */
function init (database, words, callback) {

  let operations = words.map(word => ({
    type: 'put',
    key: word.length + ':' + word,
    value: word
  }))

  database.batch(operations, callback)
}

/** @type {(Object, String, Function) -> ()} */
function query (database, word, callback) {
  // `results` must only includes words of length = `word.length`
  let results = []
  let key = word.length + ':' + word.replace(/\*/g, '')

  return database.createReadStream({ start: key, end: key + '\xff' })
    .on('error', error => {
      callback(error, null)
    })
    .on('data', data => {
      results.push(data.value.replace(/\*/g, ''))
    })
    .on('end', () => {
      callback(null, results)
    })
}

module.exports = {
  init,
  query,
}
