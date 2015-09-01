var models = require('../models')
var Author = models.Author
var base = require('./base')

var author = base.init(Author)
author.admin = base.boundAdmin()

module.exports = author


