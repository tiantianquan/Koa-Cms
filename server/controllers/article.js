var models = require('../models')
var base = require('./base')
var Article = models.Article

var article = base.init(Article)

article.admin = base.boundAdmin()

//article.admin = {
//  getAll: function*(next) {
//    this.body = this.state.docs
//  },
//  getById: function*(next) {
//    this.body = this.state.doc
//  },
//  updateById: function*(next) {
//    this.body = this.state.doc
//  },
//  deleteById: function*(next) {
//    this.body = this.state.doc
//  },
//}

article.common = {
  getAll: function*(next) {
    yield this.render('article', {data: this.state.docs})
  },
  getById: function*(next) {
    yield this.render('article', {data: this.state.doc})
  },
}

module.exports = article
