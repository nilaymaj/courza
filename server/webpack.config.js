const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: ['./index.ts'],
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
      exclude: /(node_modules|dist)/,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|dist)/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
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
