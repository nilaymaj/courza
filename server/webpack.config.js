import path from 'path';
import nodeExternals from 'webpack-node-externals';
import CircularDependencyPlugin from 'circular-dependency-plugin';

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  entry: './index.js',
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
      // failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
  ],
  node: false,
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
        loader: 'eslint-loader',
      },
    ],
  },
};
