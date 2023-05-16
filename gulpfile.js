import gulp from 'gulp'
import uglify from 'gulp-uglify-es'
import buffer from 'gulp-buffer'
import tap from 'gulp-tap'
import browserify from 'browserify'
import jest from 'gulp-jest'

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
