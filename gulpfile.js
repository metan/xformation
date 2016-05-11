'use strict';

var gulp    = require('gulp');
var include = require('gulp-file-include');
var concat  = require('gulp-concat');
var sass    = require('gulp-sass');
 
gulp.task('styles', function () {
  return gulp.src('./css/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('include', function() {
    return gulp.src(['./html/**/*.html', '!./html/partials/**/*.html'])
        .pipe(include({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
    gulp.watch('./html/**/*.html', ['include']);
    gulp.watch('./css/scss/**/*.scss', ['styles']);
});

gulp.task('default', ['watch']);
