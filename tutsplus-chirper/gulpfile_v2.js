var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var concat = require('gulp-concat');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./src/main.js'], // Only need initial file, browserify finds the deps
        transform: [babelify, reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: false // Requirement of watchify
    });
    var watcher  = watchify(bundler);
    console.log('returning watcher!');

    return watcher
        .on('update', function () { // When any files update
            var updateStart = Date.now();
            console.log('Updating!');

            watcher
            .bundle() // Create new bundle that uses the cache for high performance
            // source converts streams to file streams
            .pipe(source('main.js'))
            // optional, remove if you don't need to buffer file contents
            .pipe(buffer())
            // optional, remove if you dont want sourcemaps
            .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
            // Add transformation tasks to the pipeline here.
            .pipe(sourcemaps.write('./')) // writes .map file
            // This is where you add uglifying etc.
            .on('error', function(err) {
                console.log("watchify error", err);
            })
            .pipe(gulp.dest('./public/'));
            console.log('Updated!', (Date.now() - updateStart) + 'ms');
        })
        // .transform(babelify)
        .bundle() // Create the initial bundle when starting the task
        .pipe(source('main.js'))
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./public/'));
});

// I added this so that you see how to run two watch tasks
// gulp.task('css', function () {
//     gulp.watch('styles/**/*.css', function () {
//         return gulp.src('styles/**/*.css')
//         .pipe(concat('main.css'))
//         .pipe(gulp.dest('build/'));
//     });
// });

// Just running the two tasks
gulp.task('default', ['browserify']);
