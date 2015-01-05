var gulp = require('gulp'),
    jade = require('gulp-jade'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    clean = require('gulp-clean');

gulp.task('clean', function() {
    gulp.src('./deploy/', {read: false})
        .pipe(clean());
});

gulp.task('jade', function() {
    gulp.src('./src/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./deploy/html/'));
});

gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./deploy/js/'));
});

gulp.task('styles', function() {
    gulp.src('./src/stylus/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./deploy/css/'));
});

gulp.task('assets', function() {
    gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./deploy/assets/'));
});

gulp.task('vendors', function() {
    gulp.src('./bower_components/**/*')
        .pipe(gulp.dest('./deploy/lib/'));
});

gulp.task('server', function() {
    connect.server({
        root: './deploy/',
        port: 8000,
        open: {
            file: './deploy/html/index.html'
        }
    });
});

gulp.task('watch', ['jade', 'js', 'styles', 'assets', 'vendors', 'server'], function() {
    gulp.watch('./src/jade/*.jade', ['index']);
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/stylus/*.styl', ['styl']);
    gulp.watch('./src/assets/**/*', ['assets']);
});

gulp.task('build', ['jade', 'js', 'styles', 'assets', 'vendors']);
gulp.task('default', ['build']);