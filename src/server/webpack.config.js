const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-flow']
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        }
      }
    ]
  }
};
