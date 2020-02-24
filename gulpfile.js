var gulp = require('gulp');
var browserSync = require('browser-sync').create();

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./views/**/*.scss');
    gulp.watch('./views/**/*.ejs');
}

exports.watch = watch;