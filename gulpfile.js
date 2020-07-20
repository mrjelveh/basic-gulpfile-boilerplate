/*!
 * gulp file
 * Copyright 2020 MohammadReza Jelveh
 * Licensed under MIT (https://github.com/mrjelveh/BootsDrac/blob/master/LICENSE)
 */


// initials
const autoprefixer = require('autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      { src, dest, parallel, series, watch } = require('gulp'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      plumber = require('gulp-plumber');
      imagemin = require('gulp-imagemin');
      
// file path
const files = {
    scssPath: 'app/scss/**/*.scss',
    jsPath: 'app/js/**/*.js',
    imagePath: 'src/img/*'
}

// sass
function scssTask() {
    return src(files.scssPath)
           .pipe(sass())
           .pipe(cleanCSS())
           .pipe(dest('dist'))            // without minify
           .pipe(cssnano())
           .pipe(rename({
                suffix: '.min'
            }))
           .pipe(dest('dist'))            // minified file
}

// js
function jsTask() {
    return src(files.jsPath)
           .pipe(concat('main.js'))
           .pipe(plumber())
           .pipe(babel({
                presets: ['@babel/preset-env']
            }))
           .pipe(dest('dist'))            // without minify
           .pipe(uglify())
           .pipe(rename({
                suffix: '.min'
            }))
           .pipe(dest('dist'))            // minified file
}


// watch
function watchTask() {
    watch([files.scssPath, files.jsPath, files.imagePath],
        parallel(scssTask, jsTask));
}

// default
exports.default = series(
    parallel(scssTask, jsTask),
    watchTask
)