// Note: The use of gulp-browserify has been refactored out, per the article at
//            https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
//        and https://github.com/substack/node-browserify/issues/1198
var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var through2 = require('through2')
var concat = require('gulp-concat');
var plumber = require('gulp-plumber'); // task will stop if there's a syntax error and retry later - keeps watch task running throughout errors

// https://gist.github.com/danharper/3ca2273125f500429945
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var babelify = require('babelify');

gulp.task('browserify2', function() {
    var bundler = browserify({
        entries: ['./src/main.js'], // Only need initial file, browserify finds the deps
        transform: [reactify, {'es6': true}], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher  = watchify(bundler);

    return watcher
      .on('update', function () { // When any files update
          var updateStart = Date.now();
          console.log('Updating!');
          watcher.bundle() // Create new bundle that uses the cache for high performance
          .pipe(source('main.js'))
          // This is where you add uglifying etc.
          .pipe(gulp.dest('public'));
          console.log('Updated!', (Date.now() - updateStart) + 'ms');
      })
      .bundle() // Create the initial bundle when starting the task
      .pipe(source('main.js'))
      .pipe(gulp.dest('public'));
});

gulp.task('browserify', function () {
    var reactifyES6 = function(file) {
      return reactify(file, {'es6': true});
    };
    gulp.src('./src/main.js') // client entry point
        .pipe(plumber())
        .pipe(sourcemaps.init())
        //instead of using the blacklisted and unmaintained gulp-browserify, we'll run browserify using through2
        .pipe(through2.obj(function (file, enc, next){
            browserify(file.path, {
              'debug': true
            })
            .transform(reactifyES6)
            // .transform(babelify)
            .bundle(function(err, res){
                console.log("bundle err", err);
                file.contents = res;
                next(null, file);
            });
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public'))
});

gulp.task('default', ['browserify2']); 

gulp.task('watch', function () {
  gulp.watch('src/**/*.*', ['default']);
});

function compile(watch) {
  var bundler = watchify(browserify('./src/main.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

