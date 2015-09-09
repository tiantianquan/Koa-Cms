var webpack = require('webpack')
var path = require('path')
var APP = path.join(__dirname, 'client')

var ExtractTextPlugin = require("extract-text-webpack-plugin")


// PATHS

module.exports = {
  context: APP,
  entry: {
    entry: ['webpack/hot/dev-server', './app.js']
  },
  output: {
    path: __dirname + '/public/dist/client',
    filename: 'bundle.js',
    sourceMapFilename: '[file].map'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['ng-annotate']
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
        //loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}],
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ],
  //devServer: {
  //  //contentBase: "./client",
  //  //quiet: false,
  //  //noInfo: false,
  //  //hot: true,
  //  proxy: {
  //    '*':'http://localhost:3000'
  //  }
  //}
}