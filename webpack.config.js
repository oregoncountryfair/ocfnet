/* eslint-env node */

module.exports = {
  entry: [
    './client/ocfnet.js'
  ],
  output: {
    path: __dirname,
    filename: 'ocfnet/static/bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
    ],
  },
  plugins: [
  ]
};