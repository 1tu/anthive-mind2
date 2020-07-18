// shared config (dev and prod)
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rv = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  context: resolve(__dirname, '../src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};

module.exports = rv;
