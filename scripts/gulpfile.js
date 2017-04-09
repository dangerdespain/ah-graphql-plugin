var gulp = require('gulp')
var babel = require('gulp-babel')
var changed = require('gulp-changed')
var eslint = require('gulp-eslint')
// var del = require('del')
var fs = require('fs')
var exec = require('child_process').exec

var paths = {
  src: './graph/**/*.js',
  dest: 'graph-dist'
}

paths.toClean = [paths.dest].concat(paths.toRootDirectory)

gulp.task('buildDist', function () {
  gulp.src(paths.src) // pipe all of the files to dist, excluding the toSkipDist list
  		.pipe(changed('./' + paths.dest + '/'))
      .pipe(babel({
        ignore: 'gulpfile.babel.js',
        presets: ['es2015',"stage-2"]
      }))
      .pipe(gulp.dest('./' + paths.dest + '/'))

  gulp.src(['./graph/**/*.*', '!./graph/**/*.js']) // pipe all non-js files directly
      .pipe(gulp.dest('./' + paths.dest + '/'))
})

gulp.task('watch', ['lint', 'buildDist'], function () {
  gulp.watch([paths.src ], ['buildDist'])
})

gulp.task('lint', () => {
  return gulp.src(['./' + paths.src]) // pipe all of the files to dist, excluding the toSkipDist list
      	.pipe(eslint())
      	.pipe(eslint.format())
})
