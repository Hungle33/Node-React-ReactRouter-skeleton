var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream'); /* Using vinyl stream to convert string to a readable node stream */

gulp.task('browserify', function() {
  return browserify('js/main.js')
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('build', ['browserify']);