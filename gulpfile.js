var gulp          = require("gulp");
var browserify    = require("browserify");
var babelify      = require('babelify');
var browserSync   = require('browser-sync').create();
var source        = require('vinyl-source-stream');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');

var jsFiles   = "src/js/**/*.js";
var viewFiles = "src/js/**/*.html";
var cssFiles  = "src/css/*.scss"

gulp.task('browserify', ['views'], function() {
  return browserify('./src/js/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .bundle()
      .pipe(source('main.js'))
      .pipe(gulp.dest('./build/'));
});

gulp.task('html', function() {
  return gulp.src("src/index.html")
      .pipe(gulp.dest('./build/'));
});

gulp.task('views', function() {
  return gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .pipe(gulp.dest('./src/js/config/'));
});

gulp.task('styles', function(){
  return gulp.src(cssFiles)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./build/'))
})

gulp.task('build', ['html', 'browserify'], function() {
  var html = gulp.src("build/index.html")
                 .pipe(gulp.dest('./build/'));
  var js = gulp.src("build/main.js")
               .pipe(uglify())
               .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function(){
    gulp.watch("src/index.html", ['html']);
    gulp.watch(viewFiles, ['views']);
    gulp.watch(jsFiles, ['browserify']);
})

gulp.task('default', ['watch', 'browserify', 'html', 'build'])