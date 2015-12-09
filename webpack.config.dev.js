const config = require('./webpack.config');

module.exports = Object.assign({}, config, {
  entry: Object.assign({}, config.entry, {
    'webpack-dev-server': 'webpack-dev-server/client?http://localhost:8080'
  }),
  output: Object.assign({}, config.output, {
    publicPath: '/'
  })
});
