var gulp = require('gulp');
var exec = require('child_process').exec
var livereload = require('gulp-livereload');
var gutil = require('gulp-util')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./webpack.config.js')


var dir = './client/'

gulp.task('html', function () {
  gulp.src(dir + '**/*.html')
    .pipe(livereload());
})

gulp.task('css', function () {
  gulp.src(dir + '**/*.css')
    .pipe(livereload());
})

gulp.task('js', function () {
  gulp.src(dir + '**/*.js')
    .pipe(livereload());
})


gulp.task('watch', function () {
  gulp.watch(dir + '*.html', function () {
    gulp.run('html')
  })
  gulp.watch(dir + '**/*.html', function () {
    gulp.run('html')
  })
  //gulp.watch(dir + '**/*.css', function() {
  //  gulp.run('css')
  //})
  //gulp.watch(dir + '**/*.js', function() {
  //  gulp.run('js')
  //})
  livereload.listen();
  // gulp.watch(dir + '**', function() {})
})

gulp.task("webpack-dev-server", function (callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "sourcemap";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    hot:true,
    inline:true,
    proxy:{
      '*':'http://localhost:3000'
    },
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function (err) {
      if (err) throw new gutil.PluginError("webpack-dev-server", err);
      gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    })

  gulp.run('watch')
})

gulp.task('serve', function () {
  exec('webpack-dev-server --content-base-target http://localhost:3000 -h --inline -d')
  gulp.run('watch')
})

//default
gulp.task('default', ['serve'])