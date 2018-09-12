var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("scss", function () {
  return gulp.src("assets/src/scss/styles.scss")
    .pipe(sass({ outputStyle: "compressed" })
      .on("error", sass.logError))
    .pipe(autoprefixer({ browsers: ["last 2 versions"] }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("assets/css"));
});

gulp.task("js", function () {
  return gulp.src("assets/src/js/*.js")
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("assets/js"));
});

gulp.task("watch", function () {
  gulp.watch("assets/src/scss/**/*.scss", ["scss"]);
  gulp.watch("assets/src/js/*.js", ["js"]);
});

gulp.task("default", ["scss", "js"]);