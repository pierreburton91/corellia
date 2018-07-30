var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var pug = require('gulp-pug');
var imageMin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');


gulp.task('css', function() {
    return gulp.src('dev/styles/*.styl')
        .pipe(stylus({compress: false, paths: ['source/stylus']}))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('wwwroot/styles/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function() {
    return gulp.src('dev/scripts/*.js')
        .pipe(uglify())
        .pipe(concat('global.min.js'))
        .pipe(gulp.dest('wwwroot/js/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('img', function () {
    return gulp.src('dev/images/*.{png,jpg,jpeg,gif,svg}')
        .pipe(imageMin())
        .pipe(gulp.dest('wwwroot/images/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('html', function() {
    return  gulp.src('dev/html/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('wwwroot/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function () {
    gulp.watch('dev/styles/*.styl', ['css']);
    gulp.watch('dev/scripts/*.js', ['js']);
    gulp.watch('dev/html/*.pug', ['html']);
    gulp.watch('dev/images/*.{png,jpg,jpeg,gif,svg}', ['img']);
 });

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "wwwroot"
        }
    });
});

gulp.task('build', ['css', 'js', 'img', 'html']);
gulp.task('start', ['build', 'browser-sync', 'watch']);