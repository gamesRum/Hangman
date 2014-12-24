var gulp = require('gulp');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
watch = require('gulp-watch');

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

gulp.task('components', function() {
    return gulp.src('./bower_components/**/*')
        .pipe(gulp.dest('./deploy/bower_components/'));
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

gulp.watch('./src/jade/*.jade', ['jade']);
gulp.watch('./src/js/*.js', ['js']);
gulp.watch('./src/stylus/*.styl', ['styl']);
gulp.watch('./src/assets/**/*', ['assets']);

gulp.task('build', ['jade', 'js', 'styl', 'assets', 'components']);

gulp.task('default', ['build']);