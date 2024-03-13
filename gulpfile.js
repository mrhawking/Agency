const gulp = require('gulp');

//Tasks
require('./gulp/dev.js');
require('./gulp/docs.js');

gulp.task('default', gulp.series(
  'clean:dev',
  gulp.parallel('html:dev', 'scss:dev', 'images:dev', 'sprite:dev', 'fonts:dev', 'js:dev'),
  gulp.parallel('server:dev', 'watch:dev')
));

gulp.task('docs', gulp.series(
  'clean:docs',
  gulp.parallel('html:docs', 'scss:docs', 'images:docs', 'sprite:docs', 'fonts:docs', 'copy:docs', 'js:docs'),
  gulp.parallel('server:docs')
));

