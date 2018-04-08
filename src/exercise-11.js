let level = require('level')
let sublevel = require('level-sublevel')

let array = [
  {
    namespace: 'robots',
    slogan: 'beep boop'
  },
  {
    namespace: 'dinosaurs',
    slogan: 'rawr'
  }
]

module.exports = (databasePath, callback) => {
  let database = sublevel(level(databasePath))

  database.on('error', error => {
    callback(error)
  })

  array.forEach(({ namespace, slogan }) => {

    let namespacedDatabase = database.sublevel(namespace)

    namespacedDatabase.put('slogan', slogan)
  })

  database.close(error => {
    callback(error && error)
  })
}
