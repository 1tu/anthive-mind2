// shared config (dev and prod)
const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function fromRoot(p) {
  return join(__dirname, '..', p);
}

const rv = {
  context: resolve(__dirname, '../src'),
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@domain': resolve(__dirname, '../src/domain'),
      '@common': resolve(__dirname, '../src/common'),
    },
  },
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
