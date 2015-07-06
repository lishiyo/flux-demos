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
  stats: { colors: true, progress: true },

  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use "*" to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  proxy: {
    // "*": "http://localhost:8080"
  }
}).listen(8080, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('+++ Listening at localhost:8080 +++');
});
