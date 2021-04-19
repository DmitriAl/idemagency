/* Глобальные переменные */
const { src, dest, watch, parallel } = require('gulp');

/* Конкатенация файлов в один файл */
const concat = require('gulp-concat');

/* LESS */
const less = require('gulp-less');

/* Автообновление страницы */
const browserSync = require('browser-sync').create();

/* Автопрефиксер */
const autoprefixer = require('gulp-autoprefixer');





/* Функция автообновления страницы */
function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'application/'
    }
  });
}

/* Функция для LESS  */
function styles() {
  return src([
    'application/less/fonts.less',
    'node_modules/normalize.css/normalize.css',
    'application/less/style.less',
  ])
  .pipe(less({compress: true}))
  .pipe(concat('style.min.css'))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 version'],
  }))
  .pipe(dest('application/css'))
  .pipe(browserSync.stream())
}

/* Билдер */
function build() {
  return src([
    'application/css/style.min.css',
    'application/fonts/**/*',
    'application/*.html'
  ], {base: "application"}
  )
  .pipe(dest('assets'))
}

/* Функция автообновления страницы */
function watcher() {
  watch(['application/less/**/*.less'], styles);
  watch(['application/*.html']).on('change', browserSync.reload)
}





/* Экспорты */
exports.styles = styles;
exports.watcher = watcher;
exports.browsersync = browsersync;

exports.build = build;

exports.default = parallel(styles, browsersync, watcher);