var models = require('../models')
var Article = models.Article
var Category = models.Category
var Author = models.Author
var base = require('./base')

var category = base.init(Category)
category.admin = base.boundAdmin()
category.getCategoryArticles = function*(next) {
  this.state.docs = yield Article.find({category: this.params.categoryId}).exec()
  yield next
}
category.admin.getCategoryArticles = function*(next){
  this.body = this.state.docs
}

module.exports = category




