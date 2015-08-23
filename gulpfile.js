var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config")

gulp.task('default', ['webpack-dev-server']);

gulp.task("build-dev", ["webpack:build-dev"], function() {
	gulp.watch(["app/**/*"], ["webpack:build-dev"]);
});

gulp.task('prod', ['webpack:build']);

gulp.task('webpack:build', function(callback) {
	var config = Object.create(webpackConfig);
	// config.plugins = config.plugins.concat(
	// 	new webpack.DefinePlugin({
	// 		'process.env': {
	// 			'NODE_ENV': JSON.stringify('production')
	// 		}
	// 	}),
	// 	new webpack.optimize.DedupePlugin(),
	// 	new webpack.optimize.UglifyJsPlugin()
	// );
	// run webpack
	webpack(config, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({ colors: true }));
		callback();
	});
});

var devConfig = Object.create(webpackConfig);
webpackConfig.debug = true;

var devCompiler = webpack(devConfig);

gulp.task("webpack:build-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({ colors: true }));
		callback();
	});
});

gulp.task("webpack-dev-server", ["browser-sync"], function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		publicPath: "/" + myConfig.output.publicPath,
		stats: { colors: true }
	}).listen(8080, "localhost", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
	});
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init(['./index.html'], {
      notify: true,
      ghostMode: false,
      open: false,
      server: {
          baseDir: "./"
      }
    });
});
