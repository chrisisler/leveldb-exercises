let level = require('level')

module.exports = function (databaseDirectory, filepath, callback) {
  let database = level(databaseDirectory, { valueEncoding: 'json' })
  let objects = require(filepath)

  database.on('error', error => {
    callback(error, null)
  })

  objects.forEach(object => {
    if (object.user) {
      database.put(object.user + '!' + object.name, object)
    } else {
      database.put(object.name, object)
    }
  })

  database.close(error => {
    if (error) {
      callback(error)
    } else {
      callback()
    }
  })
}
