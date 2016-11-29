var gulp = require('gulp');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('bower', function() {
  /* JS */
  var jsFiles = [
    'public/components/jquery/dist/jquery.min.js',
    'public/components/bootstrap/dist/js/bootstrap.min.js'
  ];
  var jsDest = 'public/js/';

  /* CSS */
  var cssFiles = [
    'public/components/bootstrap/dist/css/bootstrap.min.css',
    'public/components/bootstrap/dist/css/bootstrap-theme.min.css',
    'public/components/font-awesome/css/font-awesome.min.css'
  ];
  var cssDest = 'public/css/';

  /* FONTS */
  var fontsFiles = [
    'public/components/font-awesome/fonts/**/*.{ttf,woff,eof,svg,otf,eot,woff}'
  ];
  var fontsDest = 'public/fonts';

  /* Concat */
  gulp.src(jsFiles)
      .pipe(concat(jsDest))
      .pipe(rename('components_scripts.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(jsDest));

  gulp.src(cssFiles)
      .pipe(concat(cssDest))
      .pipe(rename('components_style.min.css'))
      .pipe(gulp.dest(cssDest));

  return gulp.src(fontsFiles).pipe(gulp.dest(fontsDest));
});
