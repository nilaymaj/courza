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
        test: /\.jsx?$/,
        enforce: 'pre',
        use: ['remove-flow-types-loader'],
        exclude: /(node_modules|dist)/
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        loader: 'eslint-loader'
      }
    ]
  }
};
