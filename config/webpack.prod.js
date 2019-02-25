const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      { 
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ], 
        test: /\.scss$/ 
      }
    ]
  },
  plugins: [ 
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
  ]
})