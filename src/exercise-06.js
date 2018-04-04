let level = require('level')
let through2 = require('through2')

module.exports = function (databaseDirectory) {
  let database = level(databaseDirectory)

  database.on('error', error => {
    console.error(error)
  })

  return database.createReadStream()
    .pipe(through2.obj(({ key, value }, _, next) => {
      let formatted = key + '=' + value
      next(null, formatted)
    }))
    .on('end', () => {
      database.close(error => {
        if (error) {
          console.error(error)
        }
      })
    })
}
