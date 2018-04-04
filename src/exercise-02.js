let level = require('level')

module.exports = function (databaseDirectory, key, cb) {
  let database = level(databaseDirectory)

  database.get(key, (getError, value) => {
    database.close(closeError => {
      cb(closeError || getError, value)
    })
  })
}
