"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");

gulp.task("css", function () {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"));
});

gulp.task("sprite", function () {
  return gulp
    .src(["source/img/icon-*.svg", "source/img/logo-*.svg"])
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )

    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp
    .src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(gulp.dest("build"));
});

gulp.task("images", function () {
  return gulp
    .src("build/img/**/*.{png, jpg, svg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLeve: 3 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.svgo(),
      ])
    )

    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp
    .src("build/img/**/*.{png, jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("copy", function () {
  return gulp
    .src(
      [
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "!source/img/icon-*.svg",
        "!source/img/logo-*.svg",
        "source/js/**",
        "source/*.ico",
      ],
      {
        base: "source",
      }
    )
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html"));

gulp.task("server", function () {
  server.init({
    server: "build/",
  });
  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch(
    ["source/img/icon-*.svg", "source/img/logo-*.svg"],
    gulp.series("sprite", "html", "refresh")
  );
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("build", "server"));
