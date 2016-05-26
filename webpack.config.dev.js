var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    main: [
      'webpack-hot-middleware/client', './src/index'
    ],
    test: "mocha!./test/index.js"
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
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
      "plugins": ["react-transform"],
      "extra": {
        "react-transform": {
          "transforms": [{
            "transform": "react-transform-hmr",
            "imports": ["react"],
            "locals": ["module"]
          }, {
            "transform": "react-transform-catch-errors",
            "imports": ["react", "redbox-react"]
          }]
        }
      },
      include: path.join(__dirname, 'src')
    }]
  }
};
