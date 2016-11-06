var gulp          = require("gulp");
var browserify    = require("browserify");
var babelify      = require('babelify');
var browserSync   = require('browser-sync').create();
var source        = require('vinyl-source-stream');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var sass = require('gulp-sass');

var jsFiles   = "src/js/**/*.js";
var viewFiles = "src/js/**/*.html";
var cssFiles  = "src/css/*.scss"

gulp.task('browserify', ['views', 'styles'], function() {
  return browserify('./src/js/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .bundle()
      .pipe(source('main.js'))
      .pipe(gulp.dest('./build/'));
});

gulp.task('styles', function(){
  return gulp.src(cssFiles)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./build/'))
})

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

gulp.task('build', ['html', 'browserify', 'styles'], function() {
  var html = gulp.src("build/index.html")
                 .pipe(gulp.dest('./build/'));
  var js = gulp.src("build/main.js")
               .pipe(uglify())
               .pipe(gulp.dest('./build/'));
  var css = gulp.src("build/style.css")
                 .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function(){
    gulp.watch("src/index.html", ['html']);
    gulp.watch(viewFiles, ['views']);
    gulp.watch(jsFiles, ['browserify']);
    gulp.watch(cssFiles, ['styles']);
})

gulp.task('default', ['browserify', 'styles', 'html', 'watch'])