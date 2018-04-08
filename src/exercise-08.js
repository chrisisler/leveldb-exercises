let level = require('level')

module.exports = function (databaseDirectory, date, callback) {
  let database = level(databaseDirectory)
  let tweetTexts = []

  database.createReadStream({ gte: date, lte: date + '\xff' })
    .on('error', error => {
      callback(error, null)
    })
    .on('data', ({ value: tweetText }) => {
      tweetTexts.push(tweetText)
    })
    .on('end', () => {
      database.close(error => {
        if (error) {
          callback(error, null)
        } else {
          callback(null, tweetTexts)
        }
      })
    })
}
