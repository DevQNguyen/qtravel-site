var gulp = require('gulp'),
  webpack = require('webpack');


gulp.task('scripts', ['modernizr'], function (callback) {
  // webpack require relative path to config file
  webpack(require('../../webpack.config.js'), function (err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
  });
});

