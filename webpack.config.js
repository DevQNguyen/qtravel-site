// var path = require('path');
const path = require('path');

module.exports = {
  entry: {
    App: "./app/assets/scripts/App.js",
    Vendor: "./app/assets/scripts/Vendor.js"
  },
  output: {
    path: path.resolve(__dirname, "./app/temp/scripts"),
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']  // Use only ES2015 standards
        },
        test: /\.js$/,   // Tells Webpack that babel-loader should only be applied to JS files
        exclude: /node_modules/  // tells Webpack to exclude specific files
      }
    ]
  }
}