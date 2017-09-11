var path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    inline: true,
    proxy: {
      '^/yelpit/*': {
        target: 'http://localhost:8000/yelpit',
        secure: false
      }
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: "babel-loader",
        include: __dirname,
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}
