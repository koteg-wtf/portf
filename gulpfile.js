"use strict";

var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    open = require('gulp-open'),
    image = require('gulp-image');

var config = {
    SERVER_HOST: 'localhost',
    SERVER_PORT: 8080
};

// Connect Task
gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});

// Open Browser
gulp.task('openServer', function () {
    gulp.src(__filename)
        .pipe(open({
            uri: 'http://' + config.SERVER_HOST + ':' + config.SERVER_PORT
        }));
});

// CSS Compilation Task
gulp.task('compileCSS', function () {
    gulp.src('./less/style.less')
        .pipe(less())
        .pipe(prefix('last 5 versions', '> 1%', 'ie 9'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});

// Images Optimization
gulp.task('image', function () {
    gulp.src('./images/**/*.*')
        .pipe(image())
        .pipe(gulp.dest('./optImg'));
});

// App Reloader
gulp.task('reloadApp', function () {
    gulp.src('./')
        .pipe(connect.reload());
});

// Watcher Task
gulp.task('watch', function () {
    gulp.watch('less/*.less', ['compileCSS']);
    gulp.watch('./*.html', ['reloadApp']);
    gulp.watch('./locale.json', ['reloadApp']);
    gulp.watch('scripts/app/**/*.hbs', ['reloadApp']);
    gulp.watch('scripts/**/*.js', ['reloadApp']);
});

// Default Task
gulp.task('default', ['connect', 'openServer', 'compileCSS', 'watch']);