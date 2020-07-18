const path = require('path');

module.exports = {
  mode: 'production',
  // mode: 'development',
  // devtool: 'eval-source-map',
  target: 'node',
  entry: './src/index.ts',
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'run.js',
    path: path.resolve(__dirname),
  },
};
