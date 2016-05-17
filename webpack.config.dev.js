const path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    main: ['webpack-hot-middleware/client', './lib/index'],
    test: "mocha!./test/index.js"
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style-loader!css-loader"
    },{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'lib')
    }]
  }
};
