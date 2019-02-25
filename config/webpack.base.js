const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: ['babel-loader'],
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/assets/index.html',
      filename: './index.html',
      inject: false
    }),
    new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '..') })
  ],
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    extensions: ['*', '.js', '.css', '.scss']
  }
};
