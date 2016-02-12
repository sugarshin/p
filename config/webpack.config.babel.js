import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import cssMqpacker from 'css-mqpacker';
import stylintrc from './.stylintrc';

const production = process.env.npm_config_production === 'true';
const cssModules = 'modules&importLoaders=1&localIdentName=[path][name]__[local]___[hash:base64:8]';
const cssLoader = production ?
  `css-loader?minimize&${cssModules}` : `css-loader?${cssModules}`;
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
    path: path.resolve(path.resolve(__dirname, '..', buildDir, 'assets')),
    filename: production ? 'app-[hash].js' : 'app.js',
    publicPath: '/assets/'
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
        query: stylintrc,
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
      }
    ]
  },
  postcss: () => [
    autoprefixer({ browsers: ['last 2 versions'] }),
    cssMqpacker()
  ],
  eslint: { configFile: './config/.eslintrc' },
  devServer: {
    contentBase: `./${buildDev}`,
    hot: true,
    publicPath: '/assets/'
  }
};
