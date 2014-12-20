var gulp = require('gulp');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');

gulp.task('jade', function() {
    gulp.src('./src/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./deploy/html/'))
});

gulp.task('js', function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./deploy/js/'))
});

gulp.task('styl', function() {
    gulp.src('./src/stylus/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./deploy/css/'));
});

gulp.task('assets', function() {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./deploy/assets/'));
});

gulp.task('server', function() {
    connect.server({
        root: './deploy/html/',
        port: 8000
    });
});

gulp.task('build', ['jade', 'js', 'styl', 'assets']);

gulp.task('default', ['build']);