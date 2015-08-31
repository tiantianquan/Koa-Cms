var gulp = require('gulp');
var exec = require('child_process').exec
var livereload = require('gulp-livereload');


var dir = './public/admin/'

gulp.task('html', function() {
  gulp.src(dir + '**/*.html')
    .pipe(livereload());
})

gulp.task('css', function() {
  gulp.src(dir + '**/*.css')
    .pipe(livereload());
})

gulp.task('js', function() {
  gulp.src(dir + '**/*.js')
    .pipe(livereload());
})


gulp.task('watch', function() {
  gulp.watch(dir + '*.html', function() {
    gulp.run('html')
  })
  gulp.watch(dir + '**/*.html', function() {
    gulp.run('html')
  })
  gulp.watch(dir + '**/*.css', function() {
    gulp.run('css')
  })
  gulp.watch(dir + '**/*.js', function() {
    gulp.run('js')
  })
  livereload.listen();
  // gulp.watch(dir + '**', function() {})
})

gulp.task('serve', function() {
  exec('node --harmony ./server/app.js')
  gulp.run('watch')
})

//default
gulp.task('default', ['serve'])