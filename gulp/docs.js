const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const webpHTML = require('gulp-webp-html');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const webpCss = require('gulp-webp-css');
const svgstore = require('gulp-svgstore');
const rename = require("gulp-rename");

gulp.task('clean:docs', (done) => {
  if (fs.existsSync('./docs/')) {
    return gulp.src('./docs/', { read: false })
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

gulp.task('html:docs', () => {
  return gulp.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
    .pipe(changed('./docs/'))
    .pipe(plumber(plumberConfig('Html')))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(webpHTML())
    .pipe(htmlclean())
    .pipe(gulp.dest('./docs/'))
});

gulp.task('scss:docs', () => {
  return gulp.src('./src/scss/*.scss')
    .pipe(changed('./docs/css/'))
    .pipe(plumber(plumberConfig('Styles')))
    .pipe(sourceMaps.init())
    .pipe(autoprefixer())
    .pipe(sassGlob())
    .pipe(webpCss())
    .pipe(groupMedia())
    .pipe(sass())
    .pipe(csso())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./docs/css/'))
});

gulp.task('images:docs', () => {
  return gulp.src('./src/img/**/*.{jpg,png}',)
    .pipe(changed('./docs/img/'))
    .pipe(avif({ quality: 50 }))

    .pipe(gulp.src('./src/img/**/*.{jpg,png}'))
    .pipe(changed('./docs/img/'))
    .pipe(webp())

    .pipe(gulp.src(['./src/img/**/*.{jpg,png,svg}', '!./src/img/icons/*.svg']))
    .pipe(changed('./docs/img/'))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('./docs/img/'))
});

gulp.task('sprite:docs', () => {
  return gulp.src('./src/img/icons/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./docs/img/'));
})

// gulp.task('images:docs', () => {
//   return gulp.src('./src/img/**/*')
//     .pipe(changed('./docs/img/'))
//     .pipe(webp())
//     .pipe(gulp.dest('./docs/img/'))

//     .pipe(gulp.src('./src/img/**/*'))
//     .pipe(changed('./docs/img/'))
//     .pipe(imagemin({ verbose: true }))
//     .pipe(gulp.dest('./docs/img/'));
// });

gulp.task('fonts:docs', () => {
  return gulp.src('./src/fonts/**/*')
    .pipe(changed('./docs/fonts/'))
    .pipe(gulp.dest('./docs/fonts/'))
});

//Эту задачу настроить потом, когда юудт понятно, какие еще файлы надо скопировать
// gulp.task('copy:docs', () => {
//   return gulp.src('./src/img/*.ico')
//   .pipe(gulp.dest('./docs/'))
// });

gulp.task('js:docs', () => {
  return gulp.src('./src/js/*.js')
    .pipe(changed('./docs/js/'))
    .pipe(plumber(plumberConfig('Js')))
    .pipe(babel())
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./docs/js/'))

});

gulp.task('server:docs', () => {
  return gulp.src('./docs')
    .pipe(server({
      livereload: true,
      open: true
    }))
})

