// production config
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  target: 'node',
  entry: './index.ts',
  output: {
    filename: 'run.js',
    path: resolve(__dirname, '..'),
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(false),
    })
  ],
});
