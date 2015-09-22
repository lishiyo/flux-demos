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

gulp.task('browserify', function () {
    gulp.src('./src/main.js') // client entry point
        .pipe(plumber())
        .pipe(sourcemaps.init())
        //instead of using the blacklisted and unmaintained gulp-browserify, we'll run browserify using through2
        .pipe(through2.obj(function (file, enc, next){
            browserify(file.path, {'debug': true})
            .transform(babelify)
            .transform(reactify)
            .bundle(function(err, res){
                file.contents = res;
                next(null, file);
            });
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public'))
});

gulp.task('default', ['browserify']); 

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

