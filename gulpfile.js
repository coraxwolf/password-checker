const gulp = require('gulp');
const del = require('del');

const paths = {
  html: {
    src: 'src/*.html',
    dest: 'dist/public/',
  },
  scripts: {
    src: 'src/js/*.js',
    dest: 'dist/public/js/',
  },
};

function clean() {
  return del([ 'dist/public/*' ]);
};

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(gulp.dest(paths.scripts.dest));
};

function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
};

const build = gulp.series(clean, gulp.parallel(html, scripts));

exports.clean = clean;
exports.scripts = scripts;
exports.html = html;

exports.default = build;
