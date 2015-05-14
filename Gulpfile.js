// File: Gulpfile.js
'use strict';

var gulp                = require('gulp'),
    connect             = require('gulp-connect'),
    historyApiFallback  = require('connect-history-api-fallback'),

    // preocesa y comprime archivos de styl a css
    stylus              = require('gulp-stylus'),
    nib                 = require('nib');



// Servidor web de desarrollo
gulp.task('server', function() {
  connect.server({
  root: './app',
  hostname: 'localhost',
  port: 5000,
  livereload: true,
  middleware: function(connect, opt) {
      return [ historyApiFallback() ];
    }
 });
});

// Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function() {
  gulp.src('./app/stylesheets/main.styl')
  .pipe(stylus({
    use: nib(),
    compress: false }))
  .pipe(gulp.dest('./app/stylesheets'))
  .pipe(connect.reload());
});


// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
  gulp.src('./app/**/*.html')
  .pipe(connect.reload());
});

// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/stylesheets/**/*.styl'], ['css']);
});

gulp.task('default', ['server', 'watch']);
