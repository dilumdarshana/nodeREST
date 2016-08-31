// dependacies
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

// task runner
gulp.task('default', function() {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: { PORT: 5000 },
    ignore: ['./node_moduels/**']
  })
  .on ('restart', function() {
      console.log ('Restarting...');
  })
});