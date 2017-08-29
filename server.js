var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var path = require('path');

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  contentBase: 'dist',
  hot: true,
  inline: true,
  filename: 'main.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
});
server.listen(8000, 'localhost', function() {});
