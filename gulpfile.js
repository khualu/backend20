// testing out some sass compiler
// will maybe use later for browser sync or concatting files
// as for now this works

const gulp = require('gulp')
const sass = require('gulp-sass')
const sync = require('browser-sync').create()

//compile scss into css
function style() {
    // 1. where is my scss file
    return gulp.src('./public/**/*.scss')
    // 2. pass scss file through compiler
    .pipe(sass())
    // 3. where do I save the compiled CSS?
    .pipe(gulp.dest('./public/css/'))
}

exports.style = style