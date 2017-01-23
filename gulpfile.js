// dependacies
var gulp = require('gulp'), // The streaming build system
    nodemon = require('gulp-nodemon'), // it's gulp + nodemon + convenience
    gulpMocha = require('gulp-mocha'), // Run Mocha tests
    env = require('gulp-env'), // Add env vars to your process.env
    supertest = require('supertest'); // SuperAgent driven library for testing HTTP servers

// task runner
gulp.task('default', function () {
    nodemon({
            script: 'app.js',
            ext: 'js',
            env: {
                PORT: 5000
            },
            ignore: ['./node_moduels/**']
        })
        .on('restart', function () {
            console.log('Restarting...');
        });
});
// another task
gulp.task('test', function () {
    env({
        vars: {
            ENV: 'Test'
        }
    });
    gulp.src('tests/*.js', {
            read: false
        })
        // gulp-mocha needs filepaths so you can't have any plugins before it 
        .pipe(gulpMocha({
            reporter: 'nyan'
        }));
});
