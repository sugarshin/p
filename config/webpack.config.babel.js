import path from 'path';
import webpack from 'webpack';

const production = process.env.NODE_ENV === 'production';
const cssModules = 'modules&importLoaders=1&localIdentName=[path][name]__[local]___[hash:base64:8]';
const cssLoader = production ? `css?minimize&${cssModules}` : `css?${cssModules}`;
const buildDev = 'build-dev';
const buildDir = production ? 'build' : buildDev;
const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];
const entries = ['./src/index.js'];
if (production) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  entries.push(
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server'
  );
}

export default {
  plugins,
  cache: true,
  entry: entries,
  output: {
    path: path.resolve(__dirname, '..', buildDir, 'assets'),
    filename: production ? 'app-[hash].js' : 'app.js',
    publicPath: 'assets/'
  },
  display: { errorDetails: true },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.styl$/,
        loader: 'stylint',
        query: require('../.stylintrc'),
        exclude: /node_modules/,
      },
      {
        test: /\.js(x?)$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'stage-2', 'react'] }
      },
      {
        test: /\.styl$/,
        loaders: ['style', cssLoader, 'postcss-loader', 'stylus']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loaders: [
          'url?limit=102400&hash=sha512&digest=hex&name=[name]__[hash].[ext]',
          'image-webpack?progressive&bypassOnDebug&optimizationLevel=7'
        ]
      }
    ]
  },
  postcss: () => [
    require('autoprefixer')({ browsers: ['last 2 versions'] }),
    require('css-mqpacker')()
  ],
  eslint: { configFile: '.eslintrc' },
  devServer: {
    contentBase: `./${buildDev}`,
    hot: true,
    publicPath: '/assets/'
  }
};
