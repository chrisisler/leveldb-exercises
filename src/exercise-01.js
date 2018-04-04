module.exports = function (x, y, cb) {
  let string = `ALL YOUR ${x} ARE BELONG TO ${y}`
  cb(null, string)
}
