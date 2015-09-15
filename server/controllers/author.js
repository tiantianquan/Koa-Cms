var models = require('../models')
var Author = models.Author
var base = require('./base')
var sign = require('../common/sign')

var author = base.init(Author)
author.admin = base.boundAdmin()

author.create = function*(next) {
  this.request.body.password = sign.buildPassword('tiantianquan', this.request.body.password)
  try {
    this.state.doc = yield Author.create(this.request.body).exec()
  }
  catch (error) {
    console.log(error)
  }
  yield next
}


author.getUser = function*(next) {
  this.request.body.password = sign.buildPassword('tiantianquan', this.request.body.password)

  var user = yield Author.findOne({name: this.request.body.name}).exec()
  if (user !==undefined && user.password == this.request.body.password) {
    this.state.doc = 'OK'
  }
  else {
    this.state.doc = 'Fail'
  }

  yield next
}

author.admin.getUser = function*(){
  this.body = this.state.doc
}

module.exports = author


