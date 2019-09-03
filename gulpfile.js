const browsersync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

function browserSync(callback) {
    browsersync.init({
        server: true,
        port: 3000
    });
    callback();
}

function reload(callback) {
    browsersync.reload();
    callback();
}

function css() {
    return gulp.src([
            'scss/**/*.scss',
            'node_modules/normalize.css/normalize.css'
        ])
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css'))
        .pipe(browsersync.stream());
}

function watchFiles() {
    gulp.watch('scss/**/*.scss', css);
    gulp.watch('**/*.html', reload);
}

gulp.task('serve', function() {
    return gulp.src('')
});

const watch = gulp.parallel(watchFiles, browserSync);

exports.css = css;
exports.watch = watch;
