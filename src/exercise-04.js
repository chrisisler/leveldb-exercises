let level = require('level')

module.exports = function (databaseDirectory, object, callback) {
  let database = level(databaseDirectory)

  // put each prop of `object` as key-value into level data-store
  Object.keys(object).forEach(key => {
    let value = object[key]

    database.put(key, value, error => {
      if (error) {
        callback(error)
      }
    })
  })

  database.close(error => {
    if (error) {
      callback(error)
    } else {
      callback()
    }
  })
}
