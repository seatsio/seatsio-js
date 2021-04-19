var gulp = require('gulp')
var jest = require('gulp-jest').default
var browserify = require('browserify')
var tap = require('gulp-tap')
var buffer = require('gulp-buffer')
var uglify = require('gulp-uglify-es').default

gulp.task('jest', function () {
    return gulp.src('tests')
        .pipe(jest({
            preprocessorIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules'],
            automock: false
        }))
})

gulp.task('bundle', function () {
    return gulp.src('src/SeatsioClient.js', { read: true })
        .pipe(tap(function (file) {
            file.contents = browserify(file.path, { debug: true, standalone: 'SeatsioClient' }).bundle().on('error', (err) => console.log(err))
        }))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('build'))
})
