var gulp = require('gulp');
var watch = require('gulp-watch');
var git = require('gulp-git');

gulp.task('watch', function () {
    watch(['*.psd', '*.ai'], function (files, cb) {
        gulp.start('git', cb);
    });
});

gulp.task('git', function () {
  var date = new Date();
  return gulp.src(['./*.psd', './*.ai'])
  .pipe(git.add({args: '--all'}))
  .pipe(git.commit(date, {args: '-am'}))
  .pipe(git.push('origin', 'master', {args: " -f"}, function (err) {
    if (err) throw err;
  }));
});

gulp.task('default', ['watch']);