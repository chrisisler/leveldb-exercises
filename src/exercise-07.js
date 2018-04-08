let level = require('level')

module.exports = function (databaseDirectory, date, callback) {
  let database = level(databaseDirectory)
  let numberOfTweets = 0

  database.createReadStream({ gte: date })
    .on('error', error => {
      callback(error, null)
    })
    .on('data', () => {
      numberOfTweets += 1
    })
    .on('end', () => {
      database.close(error => {
        if (error) {
          callback(error, null)
        } else {
          callback(null, numberOfTweets)
        }
      })
    })
}
