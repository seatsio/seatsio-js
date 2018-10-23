var gulp = require('gulp');
var gutil = require('gulp-util');
var gconnect = require('gulp-connect');
var jest = require('gulp-jest').default;
var browserify = require('browserify');
var log = require('gulplog');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify-es').default;

gulp.task('log', function(){
  gutil.log("== Gulp Log ==");
});

gulp.task('jest', function() {
  return gulp.src('tests')
   .pipe(jest({
     "preprocessorIgnorePatterns": ["<rootDir>/dist/", "<rootDir>/node_modules"],
     "automock": false
   }));
});


gulp.task('bundle', function () {

  return gulp.src('src/SeatsioClient.js', {read: true}) // no need of reading file because browserify does.

    // transform file objects using gulp-tap plugin
    .pipe(tap(function (file) {

      log.info('bundling ' + file.path);

      // replace file contents with browserify's bundle stream
      file.contents = browserify(file.path, {debug: true, standalone: 'SeatsioClient'}).bundle().on('error', (err) => console.log(err));
    }))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build'));

});
