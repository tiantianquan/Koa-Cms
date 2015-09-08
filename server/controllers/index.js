var router = require('koa-router')()
var article = require('./article')
var author = require('./author')
var category = require('./category')
var send = require('koa-send')
var config = require('../../config')


router.get('/admin', function*(next) {
  yield send(this,config.staticPaths[1]+'/index.html');
})

//article
router.get('/admin/article', article.getAll, article.admin.getAll)
router.get('/admin/article/:id', article.getById, article.admin.getById)
router.post('/admin/article', article.create, article.admin.create)
router.put('/admin/article/:id', article.updateById, article.admin.updateById)
router.del('/admin/article/:id', article.deleteById, article.admin.deleteById)

//category
router.get('/admin/category', category.getAll, category.admin.getAll)
router.get('/admin/category/:id', category.getById, category.admin.getById)
router.post('/admin/category', category.create, category.admin.create)
router.put('/admin/category/:id', category.updateById, category.admin.updateById)
router.del('/admin/category/:id', category.deleteById, category.admin.deleteById)
//获取所属类别文章
router.get('/admin/category-articles/:categoryId',category.getCategoryArticles,category.admin.getCategoryArticles)

//author
router.get('/admin/author', author.getAll, author.admin.getAll)
router.get('/admin/author/:id', author.getById,author.admin.getById)
router.post('/admin/author', author.create, author.admin.create)
router.put('/admin/author/:id', author.updateById, author.admin.updateById)
router.del('/admin/author/:id', author.deleteById, author.admin.deleteById)



module.exports = router