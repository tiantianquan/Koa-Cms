var Router = require('koa-router')
var article = require('./article')
var author = require('./author')
var category = require('./category')
var login = require('./login')
var send = require('koa-send')
var config = require('../../config')

var router = new Router()
var adminRouter = new Router({
    prefix: '/admin'
  }
)


adminRouter.get('/', function*(next) {
  yield send(this, config.staticPaths[1] + '/index.html')
  yield next
})
//var num = 0
////TODO:拦截静态资源
//adminRouter.use(function*(next) {
//  console.log(num++)
//  if (this.session.isLogin === undefined) {
//    this.session.isLogin = false
//  }
//
//  if (this.cookies.get('loginPage') === undefined)
//    this.cookies.set('loginPage', false, {sign: false, http: false})
//
//
//  if (!this.session.isLogin) {
//    if (this.cookies.get('loginPage') === 'true' || this.cookies.get('loginPage') === true) {
//      //this.cookies.set('loginPage', false, {sign: false, http: false})
//      yield next
//    } else {
//      this.cookies.set('loginPage', true, {sign: false, http: false})
//      this.response.status = 401
//      return
//    }
//  }
//  else {
//    yield next
//  }
//})

//article
adminRouter.get('/article', article.getAll, article.admin.getAll)
adminRouter.get('/article/:id', article.getById, article.admin.getById)
adminRouter.post('/article', article.create, article.admin.create)
adminRouter.put('/article/:id', article.updateById, article.admin.updateById)
adminRouter.del('/article/:id', article.deleteById, article.admin.deleteById)

//category
adminRouter.get('/category', category.getAll, category.admin.getAll)
adminRouter.get('/category/:id', category.getById, category.admin.getById)
adminRouter.post('/category', category.create, category.admin.create)
adminRouter.put('/category/:id', category.updateById, category.admin.updateById)
adminRouter.del('/category/:id', category.deleteById, category.admin.deleteById)
//获取所属类别文章
adminRouter.get('/category-articles/:categoryId', category.getCategoryArticles, category.admin.getCategoryArticles)

//author
adminRouter.get('/author', author.getAll, author.admin.getAll)
adminRouter.get('/author/:id', author.getById, author.admin.getById)
//注册
adminRouter.post('/author', author.create, author.admin.create)
adminRouter.put('/author/:id', author.updateById, author.admin.updateById)
adminRouter.del('/author/:id', author.deleteById, author.admin.deleteById)


//登陆
adminRouter.post('/login', login.login)
adminRouter.post('/logout', function*(next) {
  this.session = null
  this.body = 'logout'
  yield next
})

router.use('',adminRouter.routes())


module.exports = router