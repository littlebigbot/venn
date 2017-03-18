import webpack from 'webpack';
import fs from 'fs';
import _ from 'lodash';

var isProd = _.includes(process.argv, '-p');

export default {
  context: __dirname + '/app',
  entry: {
    javascript: './index.js',
    html: './index.html',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[ext]'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProd ? 'production' : 'development')
      }
    })
    // new ExtractTextPlugin('[name].css'),
    // new StringReplacePlugin()
  ],
  devServer: {
    contentBase: __dirname + '/app',
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader',
          {
            loader: 'babel-loader',
            query: {
              presets: [
                'es2015',
                'react',
                'stage-0'
              ],
              plugins: [
                'transform-object-rest-spread',
                'extensible-destructuring'
              ]
            }
          }
        ]
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
      //   use: 'file-loader'
      // },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'file-loader',
          query: {
            name: '[name].[ext]'
          }
        }]
      },
    ]
  }
};
