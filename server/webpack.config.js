const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    stats: {
      hash: false,
      versions: false,
      timings: false,
      assets: false,
      chunks: false,
    },
  },
  externals: [
    nodeExternals({
      modulesFromFile: true,
    }),
  ],
  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['remove-flow-types-loader'],
        exclude: /(node_modules|dist)/,
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        loader: 'eslint-loader',
      },
    ],
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  stats: 'errors-only',
};
