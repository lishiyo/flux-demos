var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  // publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: 'public/',
  inline: true,
  noInfo: true,
  colors: true,
  progress: true
}).listen(8080, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('+++ Listening at localhost:8080 +++');
});
