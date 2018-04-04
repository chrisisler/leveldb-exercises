let level = require('level')

module.exports = function (databaseDirectory, changes, callback) {
  // changes :: { del: Array<String>, put: Object }
  
  let database = level(databaseDirectory)

  database.on('ready', () => {
    let batch = database.batch()

    Object.keys(changes.put).forEach(key => {
      let value = changes.put[key]

      batch.put(key, value)
    })

    changes.del.forEach(key => {
      batch.del(key)
    })

    batch.write(callback)
  })
}
