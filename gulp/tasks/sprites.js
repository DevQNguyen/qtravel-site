var gulp = require('gulp'),
  svgSprite = require('gulp-svg-sprite'),
  rename = require('gulp-rename'),
  del = require('del'),
  svg2png = require('gulp-svg2png');

var config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      variables: {
        // filter function
        replaceSvgWithPng: function () {
          return function (sprite, render) {
            //return render method w/sprite variable(dynamic filename), take out .svg, replace w/.png
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

// Clean/delete old Sprite folders
gulp.task('beginClean', function () {
  return del(['./app/temp/sprite]', './app/assets/images/sprites']);
});

// Take svg images combine into one svg file, config template
gulp.task('createSprite', ['beginClean'], function () {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config)) // Bundle all svg images into 1 file
    .pipe(gulp.dest('./app/temp/sprite'));
});

// Take svg and convert to png 
gulp.task('createPngCopy', ['createSprite'], function () {
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});

// Copy sprite graphics and organize more efficiently
gulp.task('copySpriteGraphic', ['createPngCopy'], function () {
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

// Copy sprite css to modules folder
gulp.task('copySpriteCSS', ['createSprite'], function () { // [createSprite] is dependency for copySpriteCSS
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

// Delete Sprite folder in temp 
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function () {
  return del('./app/temp/sprite');
});

// Run both createSprite & copySpriteCSS
gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
