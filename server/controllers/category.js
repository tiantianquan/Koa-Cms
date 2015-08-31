var models = require('../models')
var Article = models.Article
var Category = models.Category
var Author = models.Author
var base = require('./base')

var category = base.init(Category)
category.admin = base.boundAdmin()

module.exports = category



