var koa = require('koa')
var mongoose = require('mongoose')
var render = require('koa-ejs')
var static = require('koa-static')
var path = require('path')
var bodyParser = require('koa-bodyparser')
var qs = require('koa-qs')

var router = require('./controllers')
var model = require('./models')
var config = require('../config')

//初始化
var app = koa();

//登陆
var session = require('koa-generic-session')
app.use(session())
app.keys = ['1231233123']


//查询字符串解析
qs(app)
//静态资源
config.staticPaths.forEach(function (path) {
  app.use(static(path, {
    index: 'aa'
  }))
})

app.use(function*(next) {
  if (this.session.isLogin === undefined) {
    this.session.isLogin = false
  }
  //if (this.session.visitOnce === undefined) {
  //  this.session.visitOnce = false
  //}
  //
  //if (!this.session.visitOnce) {
  //  if (!this.session.isLogin) {
  //    this.session.visitOnce = true
  //    this.redirect('/admin#/login')
  //  }
  //  else{
  //    yield next
  //  }
  //}
  //else {
  //  this.session.visitOnce = false
  //  yield next
  //}
  if (this.cookies.get('loginPage') === undefined)
    this.cookies.set('loginPage', false, {sign: false, http: false})


  if (!this.session.isLogin) {
    if (this.cookies.get('loginPage')) {
      this.cookies.set('loginPage', false, {sign: false, http: false})
      yield next
    } else {
      this.cookies.set('loginPage', true, {sign: false, http: false})
      this.redirect('/admin#/login')
    }
  }
  else {
    yield next
  }
})


//链接数据库
mongoose.connect(config.mongoStr)
//初始化模板引擎
render(app, {
  root: path.join(__dirname, 'views'),
  layout: null,
  viewExt: 'ejs',
  cache: false,
  debug: true,
});
app.use(bodyParser())

//挂载路由
app.use(router.routes())


app.on('error', function (err) {
  console.log('server error', err)
})


app.listen(3000)
