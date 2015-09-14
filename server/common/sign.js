var crypto = require('crypto')

module.exports = {
  buildPassword: function (key, password) {
    var hmac = crypto.createHmac('sha1', key)
    hamc.update(password)
    return hamc.digest('hax')
  }
}



