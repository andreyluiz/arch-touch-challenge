var gulp = require('gulp');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var cssnano = require('cssnano');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var handlebars = require('gulp-compile-handlebars');
var image = require('gulp-image');
var concat = require('gulp-concat');
var concatcss = require('gulp-concat-css');
var pump = require('pump');

function jsPath(file) {
  return 'src/js/' + file;
}

function cssPath(file) {
  return 'src/css/' + file;
}

gulp.task('css', function (cb) {
  pump([
    gulp.src([
      cssPath('carousel.css'),
      cssPath('app.css'),
    ]),
    postcss([cssnext()]),
    concatcss('app.css'),
    postcss([cssnano()]),
    rename({ suffix: '.min' }),
    gulp.dest('build/assets'),
    connect.reload(),
  ], cb);
});

gulp.task('js', function (cb) {
  pump([
    gulp.src([
      jsPath('object-assign.js'),
      jsPath('carousel.js'),
      jsPath('app.js'),
    ]),
    concat('app.js'),
    uglify(),
    rename({ suffix: '.min' }),
    gulp.dest('build/assets'),
    connect.reload(),
  ], cb);
});

gulp.task('handlebars', function () {
  gulp.src('src/index.hbs')
    .pipe(handlebars(null, {
      ignorePartials: true,
      batch: ['src/partials'],
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

gulp.task('images', function () {
  gulp.src('src/images/*.*')
    .pipe(image())
    .pipe(gulp.dest('build/assets'));
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
  });
});

gulp.task('watch', function() {
  gulp.watch('src/css/*.css', ['css']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/**/*.hbs', ['handlebars']);
})

gulp.task('default', ['handlebars', 'css', 'js', 'images']);

gulp.task('serve', ['default', 'webserver', 'watch']);
