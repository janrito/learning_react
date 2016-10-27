path = require('path');
const webpack = require('webpack');
var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');

module.exports = {

  entry: './static/scripts/index',
  output: {
    path: path.join(__dirname, 'static', 'dist'),
    publicPath: 'http://localhost:2992/static/dist/',
    filename: '[name].js',
    chunkFilename: "[id].main.[chunkhash].js"

  },
  plugins: [
    new ManifestRevisionPlugin(path.join('static', 'dist', 'manifest.json'), {
        rootAssetPath: './src/static/scripts'
    })
  ],
  resolve: {
    extensions: ["", ".js", ".jsx", ".css"]
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/, // Match both .js and .jsx
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
