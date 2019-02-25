const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        use: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.scss$/
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api/**': {
        target: 'http://localhost:8000/',
        pathRewrite: { '^/api': '' },
        secure: false,
        logLevel: 'debug'
      }
    }
  }
});
