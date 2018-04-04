let level = require('level')

module.exports = function (databaseDirectory, callback) {
  let database = level(databaseDirectory)
  let result = []

  ;[...Array(100)].forEach((_, index) => {
    database.get('key' + index, (error, value) => {
      if (error) {
        if (!error.notFound) {
          callback(error, null)
          throw Error(error)
        }
      } else {
        result.push(value)
      }
    })
  })

  database.close(error => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, result)
    }
  })
}
