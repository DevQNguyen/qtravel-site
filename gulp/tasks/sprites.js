var gulp = require('gulp'),
  svgSprite = require('gulp-svg-sprite'),
  rename = require('gulp-rename'),
  del = require('del');

var config = {
  mode: {
    css: {
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

// Copy sprite graphics and organize more efficiently
gulp.task('copySpriteGraphic', ['createSprite'], function () {
  return gulp.src('./app/temp/sprite/css/**/*.svg')
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
gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
