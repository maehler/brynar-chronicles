const browsersync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const gulp = require('gulp');
const pandoc = require('gulp-pandoc');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const concat = require('gulp-concatenate').default;
const inject = require('gulp-inject');

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

function markdown() {
    return gulp.src('entries/md/*.md')
        .pipe(pandoc({
            from: 'markdown',
            to: 'html5',
            ext: '.html',
            args: [
                '--section-divs',
                '--standalone',
                '--template=templates/entry_template.html'
            ]
        }))
        .pipe(concat('all.html'))
        .pipe(gulp.dest('entries/'));
}

function index() {
    return gulp.src('index.html')
        .pipe(inject(gulp.src(['entries/all.html']), {
            starttag: '<!-- inject:entries -->',
            relative: true,
            transform: function(filePath, file) {
                return file.contents.toString('utf8');
            }}))
        .pipe(gulp.dest('./'));
}

const build = gulp.parallel(css, markdown, index);
const watch = gulp.parallel(watchFiles, browserSync);

exports.build = build;
exports.css = css;
exports.markdown = markdown;
exports.watch = watch;
exports.index = index;
