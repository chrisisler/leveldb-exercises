let multilevel = require('multilevel')
let net = require('net')

let port = 4545

module.exports = function (callback) {
  let database = multilevel.client()
  let connection = net.connect(port)

  connection
    .pipe(database.createRpcStream())
    .pipe(connection)

  let key = 'multilevelmeup'

  database.get(key, (error, value) => {
    connection.end()

    if (error) {
      callback(error, null)
    } else {
      callback(null, value)
    }
  })

}
