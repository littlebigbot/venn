import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const IS_PROD = _.includes(process.argv, '-p');

export default {
  // context: ROOT_PATH + '/app',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.resolve(SRC_PATH, 'index.js'),
    ]
  },
  output: {
    path: BUILD_PATH,
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(IS_PROD ? 'production' : 'development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, 'index.template.ejs'),
      inject: 'body'
    })
    // new ExtractTextPlugin('[name].css'),
    // new StringReplacePlugin()
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack', 'babel-loader']
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
      //   use: 'file-loader'
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
            }
          },
          'postcss-loader'
        ]
      },
      // {
      //   test: /\.html$/,
      //   use: [{
      //     loader: 'file-loader',
      //     query: {
      //       name: '[name].[ext]'
      //     }
      //   }]
      // },
    ]
  }
};
