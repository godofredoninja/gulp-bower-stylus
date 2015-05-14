// File: Gulpfile.js
'use strict';

var gulp                = require('gulp'),
    connect             = require('gulp-connect'),
    historyApiFallback  = require('connect-history-api-fallback'),

    // preocesa y comprime archivos de styl a css
    stylus              = require('gulp-stylus'),
    nib                 = require('nib'),

    // Busca errores en el JS
    jshint        = require('gulp-jshint'),
    stylish       = require('jshint-stylish');



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
    compress: true }))
  .pipe(gulp.dest('./app/stylesheets'))
  .pipe(connect.reload());
});


// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
  gulp.src('./app/**/*.html')
  .pipe(connect.reload());
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
  return gulp.src('./app/scripts/**/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));
});

// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/stylesheets/**/*.styl'], ['css']);
  gulp.watch(['./app/scripts/**/*.js'], ['jshint']);
});















gulp.task('default', ['server', 'watch']);
