const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const svgstore = require('gulp-svgstore');
const rename = require("gulp-rename");


gulp.task('clean:dev', (done) => {
  if (fs.existsSync('./build/')) {
    return gulp.src('./build/', { read: false })
      .pipe(clean())
  }
  done();
})


const plumberConfig = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: 'Error <%= error.message %>',
      sound: false
    })
  };
};

gulp.task('html:dev', () => {
  return gulp.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
    .pipe(changed('./build/', {hasChanged: changed.compareContents}))
    .pipe(plumber(plumberConfig('Html')))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build/'))
});

gulp.task('scss:dev', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(changed('./build/css/'))
    .pipe(plumber(plumberConfig('Styles')))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./build/css/'))
});

gulp.task('images:dev', () => {
  return gulp.src(['./src/img/**/*', '!./src/img/icons/*.svg'])
    .pipe(changed('./build/img/'))
    // .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('./build/img/'))
});

gulp.task('sprite:dev', () => {
  return gulp.src('./src/img/icons/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./build/img/'));
})


gulp.task('fonts:dev', () => {
  return gulp.src('./src/fonts/**/*')
    .pipe(changed('./build/fonts/'))
    .pipe(gulp.dest('./build/fonts/'))
});

//Эту задачу настроить потом, когда юудт понятно, какие еще файлы надо скопировать
// gulp.task('copy:dev', () => {
//   return gulp.src('./src/img/*.ico')
//   .pipe(gulp.dest('./build/'))
// });

gulp.task('js:dev', () => {
  return gulp.src('./src/js/*.js')
    .pipe(changed('./build/js/'))
    .pipe(plumber(plumberConfig('Js')))
    // .pipe(babel())
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./build/js/'))

});

gulp.task('server:dev', () => {
  return gulp.src('./build')
    .pipe(server({
      livereload: true,
      open: true
    }))
})

gulp.task('watch:dev', () => {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('scss:dev'));
  gulp.watch('./src/**/*.html', gulp.parallel('html:dev'));
  gulp.watch('./src/img/**/*', gulp.parallel('images:dev', 'sprite:dev'));
  gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
  gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
})

