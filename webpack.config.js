const path = require('path');

module.exports = {
  entry: {
    index: './index'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        },
        include: __dirname
      },
      {
        test: /\.json$/,
        loaders: ['json'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}
