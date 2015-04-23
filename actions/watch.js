module.exports = watch

var WDS = require('webpack-dev-server')
var webpack = require('webpack')
var path = require('path')

var cwd = process.cwd()
var _dirname = path.dirname(__dirname)

function watch(opt) {
  var compiler = webpack({
    devtool: "source-map",

    entry: [
      'webpack-dev-server/client?http://0.0.0.0:' + opt.port,
      'webpack/hot/only-dev-server',
      opt.in,
    ],

    output: {
      path: cwd,
      filename: opt.out
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],

    resolve: {
      root: [cwd, _dirname, j(_dirname, 'node_modules')],
      extensions: ['', '.js', '.jsx'],
    },

    resolveLoader: {
      root: [j(_dirname, 'node_modules')],
    },

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: ['react-hot', 'babel?stage=0']
        },
        {
          test: /\.json$/,
          loaders: ['json']
        }
      ]
    }

  }, function(err, stats) {

  })

  var server = new WDS(compiler, {
    // webpack-dev-server options
    // contentBase: "http://localhost:" + opt.port + "/",
    // or: contentBase: "http://localhost/",

    hot: true,

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    // lazy: true,
    // filename: j(cwd, opt.out),
    // watchDelay: 300,
    // publicPath: "/",
    // stats: { colors: true },
    // historyApiFallback: true,
  })

  server.listen(opt.port, "localhost", function() {})
}

function j() {
  return path.join.apply(path, arguments)
}
